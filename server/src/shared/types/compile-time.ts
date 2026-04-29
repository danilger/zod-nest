/**
 * Проверяет, что два типа полностью эквивалентны (A === B).
 *
 * Полезно для compile-time "контрактов" между слоями приложения:
 * например, когда тип записи из ORM должен строго совпадать
 * с типом DTO/контракта из Zod.
 */
export type IsExact<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

/**
 * Принуждает TypeScript выбросить ошибку компиляции,
 * если условие не равно `true`.
 *
 * @example
 * type _MustMatch = AssertTrue<IsExact<OrmType, ContractType>>;
 */
export type AssertTrue<T extends true> = T;
