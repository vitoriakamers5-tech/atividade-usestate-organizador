
import { useState } from 'react'
import './App.css'

function App() {
  const [texto, setTexto] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [filtro, setFiltro] = useState('todas')

  function adicionarTarefa(evento) {
    evento.preventDefault()

    const textoLimpo = texto.trim()

    if (!textoLimpo) {
      return
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    }

    setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa])
    setTexto('')
  }

  function alternarConclusao(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa,
      ),
    )
  }

  function removerTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id),
    )
  }

  const total = tarefas.length

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida,
  ).length

  const pendentes = total - concluidas

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === 'pendentes') return !tarefa.concluida
    if (filtro === 'concluidas') return tarefa.concluida
    return true
  })

  return (
    <main className="organizador">
      <header className="cabecalho">
        <h1>Organizador de Tarefas</h1>
        <p>Organize suas atividades de forma simples.</p>
      </header>

      <section className="resumo">
        <div className="resumo-card">
          <span>Total</span>
          <strong>{total}</strong>
        </div>

        <div className="resumo-card">
          <span>Pendentes</span>
          <strong>{pendentes}</strong>
        </div>

        <div className="resumo-card">
          <span>Concluídas</span>
          <strong>{concluidas}</strong>
        </div>
      </section>

      <form className="formulario" onSubmit={adicionarTarefa}>
        <label htmlFor="nova-tarefa">Nova tarefa</label>

        <div className="campo-tarefa">
          <input
            id="nova-tarefa"
            type="text"
            placeholder="Digite uma tarefa..."
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
          />

          <button type="submit">Adicionar</button>
        </div>
      </form>

      <section className="lista-secao">
        <h2>Minhas tarefas</h2>

        <div className="filtros">
          <button
            type="button"
            className={filtro === 'todas' ? 'ativo' : ''}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>

          <button
            type="button"
            className={filtro === 'pendentes' ? 'ativo' : ''}
            onClick={() => setFiltro('pendentes')}
          >
            Pendentes
          </button>

          <button
            type="button"
            className={filtro === 'concluidas' ? 'ativo' : ''}
            onClick={() => setFiltro('concluidas')}
          >
            Concluídas
          </button>
        </div>

        {tarefasVisiveis.length === 0 ? (
          <p className="mensagem-vazia">
            {total === 0
              ? 'Você ainda não tem tarefas. Adicione a primeira!'
              : 'Nenhuma tarefa encontrada neste filtro.'}
          </p>
        ) : (
          <ul className="lista-tarefas">
            {tarefasVisiveis.map((tarefa) => (
              <li
                key={tarefa.id}
                className={tarefa.concluida ? 'tarefa concluida' : 'tarefa'}
              >
                <label className="tarefa-conteudo">
                  <input
                    type="checkbox"
                    checked={tarefa.concluida}
                    onChange={() => alternarConclusao(tarefa.id)}
                  />

                  <span>{tarefa.texto}</span>
                </label>

                <button
                  type="button"
                  className="btn-remover"
                  onClick={() => removerTarefa(tarefa.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="rodape">
        <p>Organizador de Tarefas • React e useState</p>
      </footer>
    </main>
  )
}

export default App
