using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class InitialSpiritualCenter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Devotees",
                columns: table => new
                {
                    DevoteeID = table.Column<string>(type: "varchar(13)", unicode: false, maxLength: 13, nullable: false),
                    FIRST_NAME = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    MIDDLE_NAME = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    LAST_NAME = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    PHOTO = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FLAT_NUMBER = table.Column<int>(type: "int", nullable: false),
                    AREA = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    STATE = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CITY = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    PINCODE = table.Column<string>(type: "varchar(6)", unicode: false, maxLength: 6, nullable: false),
                    EMAILID = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    INITIATION_DATE = table.Column<DateTime>(type: "date", nullable: false, defaultValueSql: "(getdate())"),
                    CREATIONTIME = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    MODIFICATIONTIME = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devotees", x => x.DevoteeID);
                });

            migrationBuilder.CreateTable(
                name: "getPaymentDetailDTO",
                columns: table => new
                {
                    DevoteeID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "getUnpaidDetailDTO",
                columns: table => new
                {
                    DevoteeID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FIRST_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MIDDLE_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LAST_NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PHOTO = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FLAT_NUMBER = table.Column<int>(type: "int", nullable: false),
                    AREA = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    STATE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CITY = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PINCODE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EMAILID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    INITIATION_DATE = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DevoteeID = table.Column<string>(type: "varchar(13)", unicode: false, maxLength: 13, nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    PaymentMethod = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    CREATIONTIME = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    MODIFICATIONTIME = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK__Payments__MODIFI__7D439ABD",
                        column: x => x.DevoteeID,
                        principalTable: "Devotees",
                        principalColumn: "DevoteeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_DevoteeID",
                table: "Payments",
                column: "DevoteeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "getPaymentDetailDTO");

            migrationBuilder.DropTable(
                name: "getUnpaidDetailDTO");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Devotees");
        }
    }
}
