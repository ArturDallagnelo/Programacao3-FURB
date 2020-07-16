namespace RestApiEscola.Domain.Models
{
    public class Professor
    {
        public Professor(int id, string name, string contato) 
        {
            this.Id = id;
                this.Nome = name;
                this.Contato = contato;
               
        }
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal? Salario { get; set; }
        public int? Idade { get; set; }
        public string Contato { get; set; }

        public Professor()
        {
        }

        public Professor(int id, string nome, decimal? salario, int? idade, string contato) 
        {
            Id = id;
            Nome = nome;
            Salario = salario;
            Idade = idade;
            Contato = contato;
        }
    
    }
}