# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table club (
  club_id                       bigserial not null,
  name                          varchar(255),
  category                      varchar(255),
  description                   varchar(255),
  location                      varchar(255),
  constraint pk_club primary key (club_id)
);

create table event (
  event_id                      bigserial not null,
  name                          varchar(255),
  location                      varchar(255),
  description                   varchar(255),
  date                          varchar(255),
  time                          varchar(255),
  club_club_id                  bigint,
  constraint pk_event primary key (event_id)
);

create table invoice (
  invoice_id                    bigserial not null,
  club_club_id                  bigint,
  constraint pk_invoice primary key (invoice_id)
);

create table member (
  member_id                     bigserial not null,
  name                          varchar(255),
  email                         varchar(255),
  phone                         varchar(255),
  sex                           varchar(255),
  constraint pk_member primary key (member_id)
);

create table memberships (
  member_member_id              bigint not null,
  club_club_id                  bigint not null,
  constraint pk_memberships primary key (member_member_id,club_club_id)
);

create table member_rank (
  member_member_id              bigint not null,
  rank_rank_id                  bigint not null,
  constraint pk_member_rank primary key (member_member_id,rank_rank_id)
);

create table rank (
  rank_id                       bigserial not null,
  name                          varchar(255),
  club_club_id                  bigint,
  constraint pk_rank primary key (rank_id)
);

alter table event add constraint fk_event_club_club_id foreign key (club_club_id) references club (club_id) on delete restrict on update restrict;
create index ix_event_club_club_id on event (club_club_id);

alter table invoice add constraint fk_invoice_club_club_id foreign key (club_club_id) references club (club_id) on delete restrict on update restrict;
create index ix_invoice_club_club_id on invoice (club_club_id);

alter table memberships add constraint fk_memberships_member foreign key (member_member_id) references member (member_id) on delete restrict on update restrict;
create index ix_memberships_member on memberships (member_member_id);

alter table memberships add constraint fk_memberships_club foreign key (club_club_id) references club (club_id) on delete restrict on update restrict;
create index ix_memberships_club on memberships (club_club_id);

alter table member_rank add constraint fk_member_rank_member foreign key (member_member_id) references member (member_id) on delete restrict on update restrict;
create index ix_member_rank_member on member_rank (member_member_id);

alter table member_rank add constraint fk_member_rank_rank foreign key (rank_rank_id) references rank (rank_id) on delete restrict on update restrict;
create index ix_member_rank_rank on member_rank (rank_rank_id);

alter table rank add constraint fk_rank_club_club_id foreign key (club_club_id) references club (club_id) on delete restrict on update restrict;
create index ix_rank_club_club_id on rank (club_club_id);


# --- !Downs

alter table if exists event drop constraint if exists fk_event_club_club_id;
drop index if exists ix_event_club_club_id;

alter table if exists invoice drop constraint if exists fk_invoice_club_club_id;
drop index if exists ix_invoice_club_club_id;

alter table if exists memberships drop constraint if exists fk_memberships_member;
drop index if exists ix_memberships_member;

alter table if exists memberships drop constraint if exists fk_memberships_club;
drop index if exists ix_memberships_club;

alter table if exists member_rank drop constraint if exists fk_member_rank_member;
drop index if exists ix_member_rank_member;

alter table if exists member_rank drop constraint if exists fk_member_rank_rank;
drop index if exists ix_member_rank_rank;

alter table if exists rank drop constraint if exists fk_rank_club_club_id;
drop index if exists ix_rank_club_club_id;

drop table if exists club cascade;

drop table if exists event cascade;

drop table if exists invoice cascade;

drop table if exists member cascade;

drop table if exists memberships cascade;

drop table if exists member_rank cascade;

drop table if exists rank cascade;

