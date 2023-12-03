export interface BaseMapper<DBEntity, DomainEntity, DomainEntityProps> {
  toDBEntity(domain_entity: DomainEntityProps): DBEntity;
  toDomain(db_entity: DBEntity): DomainEntity;
}
