using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions<StoreContext> options) : IdentityDbContext<User>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "02d81e30-257b-4519-b3fb-94651bc71205", ConcurrencyStamp = "Member", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id = "86156d2f-af22-4d94-ad55-758079addb0d", ConcurrencyStamp = "Admin", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
