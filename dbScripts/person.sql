if not exists (
	select column_name
	from information_schema.columns
	where table_name = 'Person'
)
begin
	CREATE TABLE [dbo].[Person](
		[ID] [int] identity(1,1) primary key,
		[First_Name] varchar(100) not null,
		[Middle_Name] varchar(100) null,
		[Last_Name] varchar(100) not null,
		[Birth_Date] datetime null,
		[Photo_Key] varchar(1000) null,
		[City_ID] int null foreign key references state(id),
		[Active] [bit] NULL,
		[Created] [datetime] NULL,
		[Created_By] [int] NULL,
		[Modified] [datetime] NULL,
		[Modified_By] [int] NULL
	)
end