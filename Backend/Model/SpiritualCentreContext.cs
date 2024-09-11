using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend.Model
{
    public partial class SpiritualCentreContext : DbContext
    {
        public SpiritualCentreContext()
        {
        }

        public SpiritualCentreContext(DbContextOptions<SpiritualCentreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Devotee> Devotees { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        [NotMapped]
        public virtual DbSet<GetPaymentDetailDTO> getPaymentDetailDTO { get; set; } = null!;
        public virtual DbSet<GetUnpaidDetailDTO> getUnpaidDetailDTO { get; set; } = null!;



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Devotee>(entity =>
            {
                entity.Property(e => e.DevoteeId)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .HasColumnName("DevoteeID");

                entity.Property(e => e.Area)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("AREA");

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("CITY");

                entity.Property(e => e.Creationtime)
                    .HasColumnType("datetime")
                    .HasColumnName("CREATIONTIME")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Emailid)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("EMAILID");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("FIRST_NAME");

                entity.Property(e => e.FlatNumber).HasColumnName("FLAT_NUMBER");

                entity.Property(e => e.InitiationDate)
                    .HasColumnType("date")
                    .HasColumnName("INITIATION_DATE")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LastName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("LAST_NAME");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("MIDDLE_NAME");

                entity.Property(e => e.Modificationtime)
                    .HasColumnType("datetime")
                    .HasColumnName("MODIFICATIONTIME");

                entity.Property(e => e.Photo).HasColumnName("PHOTO");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("PINCODE");

                entity.Property(e => e.State)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("STATE");
            });

           

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Creationtime)
                    .HasColumnType("datetime")
                    .HasColumnName("CREATIONTIME")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DevoteeId)
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .HasColumnName("DevoteeID");

                entity.Property(e => e.Modificationtime)
                    .HasColumnType("datetime")
                    .HasColumnName("MODIFICATIONTIME");

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Devotee)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.DevoteeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Payments__MODIFI__7D439ABD");
            });

            
            modelBuilder.Entity<GetPaymentDetailDTO>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.DevoteeId)
                   .HasColumnName("DevoteeID");

                entity.Property(e => e.Month)
                   .HasColumnName("Month");

                entity.Property(e => e.Year)
                   .HasColumnName("Year");

                entity.Property(e => e.Amount)
                  .HasColumnName("Amount");
            });

            modelBuilder.Entity<GetUnpaidDetailDTO>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.DevoteeId)
                   .HasColumnName("DevoteeID");

                entity.Property(e => e.FirstName)
                   .HasColumnName("FIRST_NAME");

                entity.Property(e => e.MiddleName)
                   .HasColumnName("MIDDLE_NAME");
                entity.Property(e => e.LastName)
                   .HasColumnName("LAST_NAME");
                entity.Property(e => e.Photo)
                   .HasColumnName("PHOTO");
                entity.Property(e => e.FlatNumber)
                   .HasColumnName("FLAT_NUMBER");
                entity.Property(e => e.Pincode)
                   .HasColumnName("PINCODE");
                entity.Property(e => e.Emailid)
                   .HasColumnName("EMAILID");
                entity.Property(e => e.Area)
                   .HasColumnName("AREA");
                entity.Property(e => e.State)
                   .HasColumnName("STATE");
                entity.Property(e => e.City)
                   .HasColumnName("CITY");
                entity.Property(e => e.InitiationDate)
                   .HasColumnName("INITIATION_DATE");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
