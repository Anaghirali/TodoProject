using Microsoft.AspNetCore.Mvc;
using Todo_API.Data;
using Todo_API.Models;
namespace Todo_API.Controllers;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

[Route("api/aluno")]
[ApiController]
public class AlunoController : ControllerBase
{
    private TodoContext _context;
    public AlunoController(TodoContext context)
    {
        // construtor
        _context = context;
    }

    [HttpGet,]
    [Authorize(Roles = "professor, aluno")]
    public ActionResult<List<Todo>> GetAll()
    {
        return _context.ToDo.ToList();
    }

    //[Route("todoprof");

    [HttpGet("{TodoId}")]
    [Authorize(Roles = "professor, aluno")]
    public ActionResult<List<Todo>> Get(int TodoId)
    {
        try
        {
            var result = _context.ToDo.Find(TodoId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        catch
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
        }
    }
    [HttpPost]
    [Authorize(Roles = "professor, aluno")]
    public async Task<ActionResult> post(Todo model)
    {
        try
        {
            _context.ToDo.Add(model);
            if (await _context.SaveChangesAsync() == 1)
            {
                //return Ok();
                return Created($"/api/todo/{model.titulo}", model);
            }
        }
        catch
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
        }
        // retorna BadRequest se não conseguiu incluir
        return BadRequest();
    }


    [HttpPut("{TodoId}")]
    [Authorize(Roles = "professor, aluno")]
    public async Task<IActionResult> put(int TodoId, Todo dadosTodoAlt)
    {
        try
        {
            //verifica se existe aluno a ser alterado
            var result = await _context.ToDo.FindAsync(TodoId);
            if (TodoId != result.id)
            {
                return BadRequest();
            }
            result.titulo = dadosTodoAlt.titulo;
            result.todo = dadosTodoAlt.todo;
            result.tempo = dadosTodoAlt.tempo;
            await _context.SaveChangesAsync();
            return Created($"/api/aluno/{dadosTodoAlt.titulo}", dadosTodoAlt);
        }
        catch
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
        }
    }

    [HttpDelete("{TodoId}")]
    [Authorize(Roles = "professor, aluno")]
    public async Task<ActionResult> delete(int TodoId)
    {
        try
        {
            //verifica se existe todo a ser excluído
            var todo = await _context.ToDo.FindAsync(TodoId);
            if (todo == null)
            {
                //método do EF
                return NotFound();
            }
            _context.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
        }
    }


}
