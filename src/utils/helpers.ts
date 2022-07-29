import {
  Column,
  TableDescription,
  Types,
  Ydb,
  primitiveTypeToValue,
  TypedValues,
} from 'ydb-sdk';
import ITypedValue = Ydb.ITypedValue;
import IType = Ydb.IType;
import IValue = Ydb.IValue;
import PrimitiveTypeId = Ydb.Type.PrimitiveTypeId;
import { google } from 'ydb-sdk-proto';
import NullValue = google.protobuf.NullValue;

export interface IColumnDescription {
  n: string;
  t: Types;
}

export class TableDescription2 extends TableDescription {
  constructor() {
    super();
  }
  public withColumns2(columns: Array<IColumnDescription>) {
    for (const column of columns) {
      this.columns.push(new Column(column.n, Types.optional(column.t)));
    }
    return this;
  }
}

type Primitive = boolean | string | number | Date;

function preparePrimitiveValue(typeId: PrimitiveTypeId, value: any) {
  switch (typeId) {
    case PrimitiveTypeId.DATE:
      return Number(value) / 3600 / 1000 / 24;
    case PrimitiveTypeId.DATETIME:
      return Number(value) / 1000;
    case PrimitiveTypeId.TIMESTAMP:
      return Number(value) * 1000;
    default:
      return value;
  }
}

function typeToValue(type: IType | null | undefined, value: any): IValue {
  if (!type) {
    if (value) {
      throw new Error(`Got no type while the value is ${value}`);
    } else {
      throw new Error('Both type and value are empty');
    }
  } else if (type.typeId) {
    const valueLabel = primitiveTypeToValue[type.typeId];
    if (valueLabel) {
      return { [valueLabel]: preparePrimitiveValue(type.typeId, value) };
    } else {
      throw new Error(`Unknown PrimitiveTypeId: ${type.typeId}`);
    }
  } else if (type.optionalType) {
    const innerType = type.optionalType.item;
    if (value !== undefined && value !== null) {
      return typeToValue(innerType, value);
    } else {
      return {
        nullFlagValue: NullValue.NULL_VALUE,
      };
    }
  } else if (type.voidType === NullValue.NULL_VALUE) {
    return {
      nullFlagValue: NullValue.NULL_VALUE,
    };
  } else {
    throw new Error(`Unknown type ${JSON.stringify(type)}`);
  }
}

function primitive(
  type: Ydb.Type.PrimitiveTypeId,
  value: Primitive
): ITypedValue {
  const primitiveType = { typeId: type };
  return {
    type: primitiveType,
    value: typeToValue(primitiveType, value),
  };
}

export function optionalYdbValue(
  type: Ydb.Type.PrimitiveTypeId,
  value: Primitive | undefined | null
): ITypedValue {
  return value
    ? TypedValues.optional(primitive(type, value))
    : TypedValues.optionalNull({ typeId: type });
}

export function requiredYdbValue(
  type: Ydb.Type.PrimitiveTypeId,
  value: Primitive
): ITypedValue {
  return primitive(type, value);
}
