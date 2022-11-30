using Microsoft.EntityFrameworkCore;
using Todo_API.Models;

namespace Todo_API.Data
{
public class TodoContext: DbContext
{
protected readonly IConfiguration Configuration;
public TodoContext(IConfiguration configuration)
{
Configuration = configuration;
}
protected override void OnConfiguring(DbContextOptionsBuilder options)
{
// connect to sql server with connection string from app settings
options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
}
public DbSet<Todo>? ToDo { get; set; }
}
}
