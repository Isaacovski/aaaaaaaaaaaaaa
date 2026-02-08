var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Adiciona CORS para permitir chamadas do React (porta 3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // frontend 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// 🔹 Habilita CORS
app.UseCors("AllowReact");

// 🔹 Variável global para guardar o número sorteado
int numeroSecreto = new Random().Next(1, 101);

// ======================= ROTAS =======================

// 🔹 Inicia um novo jogo → RESTful: POST /jogo
app.MapPost("/jogo", () =>
{
    numeroSecreto = new Random().Next(1, 101);
    return Results.Created($"/jogo", new { mensagem = "Novo jogo iniciado!" });
});

// 🔹 Faz um palpite POST /jogo/palpite
app.MapPost("/jogo/palpite", (PalpiteRequest palpite) =>
{
    // validações de entrada
    if (palpite.Numero < 1 || palpite.Numero > 100)
    {
        return Results.BadRequest(new { erro = "O número deve estar entre 1 e 100." });
    }

    if (palpite.Numero == numeroSecreto)
    {
        numeroSecreto = new Random().Next(1, 101);
        return Results.Ok(new { resultado = "🎉 Você acertou!", novoJogo = true });
    }
    else if (palpite.Numero > numeroSecreto)
    {
        return Results.Ok(new { resultado = "O número secreto é menor!" });
    }
    else
    {
        return Results.Ok(new { resultado = "O número secreto é maior!" });
    }
});



app.Run();

// 🔹 Record para mapear o JSON recebido
record PalpiteRequest(int Numero);
