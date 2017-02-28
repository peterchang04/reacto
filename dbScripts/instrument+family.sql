if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Instrument_Family'
)
begin
	CREATE TABLE [dbo].[Instrument_Family](
		[ID] [int] identity(1,1) primary key,
		[Name] varchar(100) not null,
		[Active] [bit] NULL,
		[Created] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified] [datetime] NULL,
		[Modified_By] [int] NULL
	)

	insert into instrument_family (name,active,created,modified) values ('Strings',1,getDate(),getDate())
	insert into instrument_family (name,active,created,modified) values ('Brass',1,getDate(),getDate())
	insert into instrument_family (name,active,created,modified) values ('Percussion',1,getDate(),getDate())
	insert into instrument_family (name,active,created,modified) values ('Woodwind',1,getDate(),getDate())
	insert into instrument_family (name,active,created,modified) values ('Keyed',1,getDate(),getDate())
	insert into instrument_family (name,active,created,modified) values ('Voice',1,getDate(),getDate())

end

if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Instrument'
)
begin
	CREATE TABLE [dbo].[Instrument](
		[ID] [int] identity(1,1) primary key,
		[Name] varchar(100) not null,
		[Instrument_Family_ID] int not null foreign key references instrument_family(id),
		[Active] [bit] NULL,
		[Created] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified] [datetime] NULL,
		[Modified_By] [int] NULL
	)

	insert into instrument (name,instrument_family_id,active,created,modified) values ('Violin',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())
	insert into instrument (name,instrument_family_id,active,created,modified) values ('Viola',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())
	insert into instrument (name,instrument_family_id,active,created,modified) values ('Cello',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())
	insert into instrument (name,instrument_family_id,active,created,modified) values ('Double Bass',(select id from instrument_family where name = 'Strings'),1,getDate(),getDate())

end