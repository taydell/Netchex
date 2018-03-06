using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Netchex_api;

namespace Netchex_api
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext (DbContextOptions<EmployeeContext> options)
            : base(options)
        {
        }
        
        public DbSet<Netchex_api.Employee> Employee { get; set; }
        public DbSet<Netchex_api.PayFrequency> PayFrequency { get; set; }
        public DbSet<Netchex_api.WageType> WageType { get; set; }
    }
}
