using System.Collections.Generic;
using RestApiEscola.Domain.Interfaces;
using RestApiEscola.Domain.Models;
namespace RestApiEscola.Domain.Services
{
    public class EscolaService : IEscolaService
    {
        private readonly IEscolaService repository;
        public EscolaService(IEscolaRepository repository)
        {
            this.repository = (IEscolaService)repository;
        }

        public void Add(Professor professor)
        {
            repository.Add(professor);
        }

        public void DeleteById(int id)
        {
            repository.DeleteById(id);
        }

        public Professor GetById(int id)
        {
            return repository.GetById(id);
        }

        public List<Professor> ListAll()
        {
            return repository.ListAll();
        }


        public void Update(Professor professor)
        {
            repository.Update(professor);
        }
    }
}