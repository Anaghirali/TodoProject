using System.ComponentModel.DataAnnotations;
namespace Todo_API.Models

{
public class Todo
{
public int id { get; set; }
[Required]
[StringLength(90, ErrorMessage ="O campo Titulo não pode passar de 90 digitos")]
public string? titulo { get; set; }
[Required]
[StringLength(150, ErrorMessage ="O campo Todo não pode passar de 150 digitos")]
public string? todo { get; set; }
public int tempo { get; set; }
}
}