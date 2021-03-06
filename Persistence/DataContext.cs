using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext:IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options):base(options)
        {
            
        }
        public DbSet<Activity> Activities { get; set; }

        public DbSet<ActivityAttendee> ActivityAtendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x=> x.HasKey(y => new { y.AppUserId, y.ActivityId,}));

            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.AppUser) 
            .WithMany(b => b.Activities)
            .HasForeignKey(c=> c.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(b => b.Attendees)
            .HasForeignKey(c=> c.ActivityId);
        }
    }
}