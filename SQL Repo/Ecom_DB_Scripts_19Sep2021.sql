CREATE DATABASE [CoreEcom]

USE [CoreEcom]
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_GetProductList]    Script Date: 09/20/2021 04:33:05 AM ******/
DROP PROCEDURE [dbo].[usp_Ecom_GetProductList]
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_GetProductById]    Script Date: 09/20/2021 04:33:05 AM ******/
DROP PROCEDURE [dbo].[usp_Ecom_GetProductById]
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_DeleteProduct]    Script Date: 09/20/2021 04:33:05 AM ******/
DROP PROCEDURE [dbo].[usp_Ecom_DeleteProduct]
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_AddUpdateProduct]    Script Date: 09/20/2021 04:33:05 AM ******/
DROP PROCEDURE [dbo].[usp_Ecom_AddUpdateProduct]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 09/20/2021 04:33:05 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type in (N'U'))
DROP TABLE [dbo].[Product]
GO
USE [master]
GO
/****** Object:  Database [CoreEcom]    Script Date: 09/20/2021 04:33:05 AM ******/
DROP DATABASE [CoreEcom]
GO
/****** Object:  Database [CoreEcom]    Script Date: 09/20/2021 04:33:05 AM ******/
CREATE DATABASE [CoreEcom]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CoreEcom', FILENAME = N'C:\Users\karthick\CoreEcom.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CoreEcom_log', FILENAME = N'C:\Users\karthick\CoreEcom_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [CoreEcom] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CoreEcom].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CoreEcom] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CoreEcom] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CoreEcom] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CoreEcom] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CoreEcom] SET ARITHABORT OFF 
GO
ALTER DATABASE [CoreEcom] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CoreEcom] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CoreEcom] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CoreEcom] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CoreEcom] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CoreEcom] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CoreEcom] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CoreEcom] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CoreEcom] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CoreEcom] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CoreEcom] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CoreEcom] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CoreEcom] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CoreEcom] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CoreEcom] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CoreEcom] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CoreEcom] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CoreEcom] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [CoreEcom] SET  MULTI_USER 
GO
ALTER DATABASE [CoreEcom] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CoreEcom] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CoreEcom] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CoreEcom] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CoreEcom] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CoreEcom] SET QUERY_STORE = OFF
GO
USE [CoreEcom]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [CoreEcom]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 09/20/2021 04:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [uniqueidentifier] NOT NULL,
	[SkuCode] [nvarchar](8) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Price] [money] NOT NULL,
	[ImageUrl] [nvarchar](max) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [nvarchar](20) NOT NULL,
	[UpdatedBy] [nvarchar](20) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_AddUpdateProduct]    Script Date: 09/20/2021 04:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE      
/*************************************************************************/    
 --NAME       :     
    [dbo].[usp_Ecom_AddUpdateProduct]      
 --PURPOSE    : To Add or Updated Product 
 --PARAMS     : 
			(@Id UNIQUEIDENTIFIER,
			@SkuCode NVARCHAR(8),
			@Name NVARCHAR(250),
			@Price MONEY,
			@ImageUrl NVARCHAR(MAX),
			@IsActive BIT,
			@CreatedBy NVARCHAR(20),
			@UpdatedBy NVARCHAR(20),
			@CreatedOn DATETIME,
			@UpdatedOn DATETIME)
 --CALLS      : N/A    
 --CALLED BY  :     
 --MODS DATA  :     
 --SAMPLE CALL: EXEC [dbo].[usp_Ecom_AddUpdateProduct] @Id ='204AEA60-1360-47E0-B7BF-036A347C5F71',@SkuCode = 'F4H68THJ',@Name='Test Product',@Price='10.00',@ImageUrl='https://picsum.photos/id/237',@IsActive=1,@CreatedBy='Admin',@UpdatedBy='Admin',@CreatedOn='2021-09-11',UpdatedOn='2021-09-11'
 --HISTORY    
 --    When		 -  Who		 -  Why       -
 --  09/11/2021  - Karthick  - Add or Update Product
/*************************************************************************/ 
 AS       
BEGIN       
 -------------------------------------------------------------------------------------------    
 -- Testing      
 -------------------------------------------------------------------------------------------    
 --DECLARE @Id UNIQUEIDENTIFIER = '204AEA60-1360-47E0-B7BF-036A347C5F71';   
 --DECLARE @SkuCode NVARCHAR(8) = 'F4H68THJ'; 
 --DECLARE @Name NVARCHAR(250) = 'Test Product'; 
 --DECLARE @Price MONEY = '10.00'; 
 --DECLARE @ImageUrl NVARCHAR(MAX) = 'https://picsum.photos/id/237'; 
 --DECLARE @IsActive BIT =1; 
 --DECLARE @CreatedBy NVARCHAR(20) = 'Admin'; 
 --DECLARE @UpdatedBy NVARCHAR(20) = 'Admin'; 
 --DECLARE @CreatedOn DATETIME = GETDATE(); 
 --DECLARE @UpdatedOn DATETIME = GETDATE(); 

 -------------------------------------------------------------------------------------------    
 -- Local variables    
 -------------------------------------------------------------------------------------------     
 DECLARE @LocalProductId UNIQUEIDENTIFIER=@Id; 
 DECLARE @LocalSkuCode NVARCHAR(8) = @SkuCode; 
 DECLARE @LocalName NVARCHAR(250) = @Name; 
 DECLARE @LocalPrice MONEY = @Price; 
 DECLARE @LocalImageUrl NVARCHAR(MAX) = @ImageUrl; 
 DECLARE @LocalIsActive BIT = @IsActive; 
 DECLARE @LocalCreatedBy NVARCHAR(20) = @CreatedBy; 
 DECLARE @LocalUpdatedBy NVARCHAR(20) = @UpdatedBy; 
 DECLARE @LocalCreatedOn DATETIME = @CreatedOn; 
 DECLARE @LocalUpdatedOn DATETIME = @UpdatedOn; 

 -- SET NOCOUNT ON added to prevent extra result sets from    
 -- interfering with SELECT statements.    
 SET NOCOUNT ON;   
  -------------------------------------------------------------------------------------------    
 -- Verify by Id    
 -------------------------------------------------------------------------------------------    
 IF EXISTS (SELECT ProductId FROM Product WHERE ProductId = @LocalProductId)      
 BEGIN      
 -------------------------------------------------    
 -- Update Product    
 -------------------------------------------------    
  UPDATE Product SET Name = @LocalName,SkuCode = @LocalSkuCode,Price = @LocalPrice,ImageUrl=@LocalImageUrl,      
  IsActive=@LocalIsActive,CreatedBy=@LocalCreatedBy,UpdatedBy=@LocalUpdatedBy,CreatedOn=@LocalCreatedOn,UpdatedOn = GETDATE()
  WHERE ProductId = @LocalProductId      
 END      
 ELSE      
 BEGIN      
 -------------------------------------------------    
 -- Insert Product    
 -------------------------------------------------    
  INSERT INTO Product(ProductId,SkuCode,Name,Price,ImageUrl,IsActive,CreatedBy,UpdatedBy,CreatedOn,UpdatedOn) VALUES
  (@LocalProductId,@LocalSkuCode,@LocalName,@LocalPrice,@LocalImageUrl,@LocalIsActive,@LocalCreatedBy,@LocalUpdatedBy,@LocalCreatedOn,@LocalUpdatedOn)      
 END      
 -------------------------------------------------    
 -- Return Current Product    
 -------------------------------------------------    
 SELECT ProductId,SkuCode,Name,Price,ImageUrl,IsActive,CreatedBy,UpdatedBy,CreatedOn,UpdatedOn
 FROM Product WITH(NOLOCK) WHERE ProductId = @LocalProductId      
END    
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_DeleteProduct]    Script Date: 09/20/2021 04:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     PROCEDURE      
/*************************************************************************/    
 --NAME       :     
    [dbo].[usp_Ecom_DeleteProduct]      
 --PURPOSE    : To Delete Product 
 --PARAMS     : 
			(@Id UNIQUEIDENTIFIER)
 --CALLS      : N/A    
 --CALLED BY  :     
 --MODS DATA  :     
 --SAMPLE CALL: EXEC [dbo].[usp_Ecom_DeleteProduct] @Id ='204AEA60-1360-47E0-B7BF-036A347C5F71'
 --HISTORY    
 --    When		 -  Who		 -  Why       -
 --  09/11/2021  - Karthick  - Hard Delete Product
/*************************************************************************/ 
 AS       
BEGIN       
 -------------------------------------------------------------------------------------------    
 -- Testing      
 -------------------------------------------------------------------------------------------    
 --DECLARE @Id UNIQUEIDENTIFIER = '204AEA60-1360-47E0-B7BF-036A347C5F71';  

 -------------------------------------------------------------------------------------------    
 -- Local variables    
 -------------------------------------------------------------------------------------------     
 DECLARE @LocalProductId UNIQUEIDENTIFIER=@Id; 

 -------------------------------------------------    
 -- Delete Product    
 -------------------------------------------------    
 DELETE FROM [dbo].[Product]
 WHERE ProductId = @LocalProductId    
   
END    
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_GetProductById]    Script Date: 09/20/2021 04:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE      
/*************************************************************************/    
 --NAME       :     
    [dbo].[usp_Ecom_GetProductById]      
 --PURPOSE    : To Get Product By Id   
 --PARAMS     : 
			(@Id UNIQUEIDENTIFIER)
 --CALLS      : N/A    
 --CALLED BY  :     
 --MODS DATA  :     
 --SAMPLE CALL: EXEC [dbo].[usp_Ecom_GetProductById] @Id ='204AEA60-1360-47E0-B7BF-036A347C5F71'
 --HISTORY    
 --    When		 -  Who		 -  Why       -
 --  09/11/2021  - Karthick  - Return Product By Id  
/*************************************************************************/ 
 AS       
BEGIN       
 -------------------------------------------------------------------------------------------    
 -- Testing      
 -------------------------------------------------------------------------------------------    
 --DECLARE @Id UNIQUEIDENTIFIER = '204AEA60-1360-47E0-B7BF-036A347C5F71';   

 -------------------------------------------------------------------------------------------    
 -- Local variables    
 -------------------------------------------------------------------------------------------     
 DECLARE @LocalProductId UNIQUEIDENTIFIER=@Id; 
 -- SET NOCOUNT ON added to prevent extra result sets from    
 -- interfering with SELECT statements.    
 SET NOCOUNT ON;   
 -------------------------------------------------    
 -- Return Product By Id
 -------------------------------------------------    
 SELECT ProductId,SkuCode,Name,Price,ImageUrl,IsActive,CreatedBy,UpdatedBy,CreatedOn,UpdatedOn
 FROM Product WITH(NOLOCK) WHERE ProductId = @LocalProductId    
END
GO
/****** Object:  StoredProcedure [dbo].[usp_Ecom_GetProductList]    Script Date: 09/20/2021 04:33:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE      
/*************************************************************************/    
 --NAME       :     
    [dbo].[usp_Ecom_GetProductList]      
 --PURPOSE    : To Get Product List   
 --PARAMS     : N/A  
 --CALLS      : N/A    
 --CALLED BY  :     
 --MODS DATA  :     
 --SAMPLE CALL: EXEC [dbo].[usp_Ecom_GetProductList] 
 --HISTORY    
 --    When		 -  Who		 -  Why       -
 --  09/11/2021  - Karthick  - Return All Product List  
/*************************************************************************/ 
 AS       
BEGIN       
 -- SET NOCOUNT ON added to prevent extra result sets from    
 -- interfering with SELECT statements.    
 SET NOCOUNT ON;   
 -------------------------------------------------    
 -- Return All Product List
 -------------------------------------------------    
 SELECT ProductId,SkuCode,Name,Price,ImageUrl,IsActive,CreatedBy,UpdatedBy,CreatedOn,UpdatedOn
 FROM Product WITH(NOLOCK) ORDER BY UpdatedOn DESC
END
GO
USE [master]
GO
ALTER DATABASE [CoreEcom] SET  READ_WRITE 
GO
