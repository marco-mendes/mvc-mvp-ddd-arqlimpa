# Um pequeno guia sobre o problema cm classes anêmicas e uso de regras em projetos DDD

## Classes anêmicas

O anti-padrão Anemic Domain Model (ADM) é uma crítica comum ao design de software, especialmente em sistemas orientados a objetos que utilizam princípios de Domain-Driven Design (DDD). Esse anti-padrão é caracterizado pela separação das regras de negócio das entidades e objetos de valor, resultando em modelos de domínio onde as entidades são reduzidas a meros contêineres de dados sem lógica de negócio significativa.


### Origem e Características do Anemic Domain Model
O termo "Anemic Domain Model" foi popularizado por Martin Fowler em seus escritos sobre padrões de arquitetura de software. Fowler descreve o ADM como uma antítese ao princípio de encapsulamento, um dos pilares fundamentais da programação orientada a objetos. Em um modelo anêmico, as operações sobre os dados são tipicamente implementadas em classes de serviço separadas, deixando as entidades como simples Data Transfer Objects (DTOs).

### Problemas Associados ao Anemic Domain Model
* Violação do Encapsulamento: Ao separar a lógica de negócio das entidades, o ADM viola o princípio de encapsulamento. Isso pode levar a múltiplos pontos de modificação para uma única entidade, aumentando a complexidade do código e a probabilidade de erros.
* Dificuldade de Manutenção: Com a lógica de negócio dispersa em várias classes de serviço, o sistema torna-se mais difícil de entender e manter. Mudanças em uma regra de negócio podem exigir revisões em múltiplas classes, aumentando o risco de bugs.
* Reusabilidade Comprometida: Entidades sem comportamento são menos reutilizáveis, pois qualquer operação significativa sobre esses dados requer a implementação de lógica externa. Isso reduz a portabilidade e a eficiência das classes de domínio.
* Testabilidade Reduzida: Testar entidades que não possuem lógica interna pode parecer mais simples inicialmente, mas testar as interações entre serviços e entidades pode se tornar complicado, especialmente quando os serviços estão fortemente acoplados às entidades.
* Consequências no Desenvolvimento de Software

A adoção do ADM pode resultar em uma arquitetura de software que, embora simples de implementar inicialmente, pode se tornar complexa e custosa para manter a longo prazo. O modelo pode levar a um aumento no débito técnico, à medida que novas funcionalidades são adicionadas sem uma revisão adequada da arquitetura.

### Alternativas e Soluções
Para evitar o ADM, os desenvolvedores e arquitetos de software devem:

* Encapsular Lógica nas Entidades: Incorporar regras de negócio diretamente nas entidades e objetos de valor, garantindo que cada classe no modelo de domínio seja responsável por sua própria lógica.
* Utilizar o Domain-Driven Design de Forma Efetiva: DDD enfatiza modelos de domínio ricos e bem encapsulados.
* As entidades e objetos de valor devem ser projetados com comportamentos que refletem as operações do negócio.
* Refatorar o Modelo Regularmente: A arquitetura de software deve ser continuamente revisada e refatorada para garantir que o modelo de domínio permaneça alinhado com as necessidades do negócio e com as melhores práticas de design.

## Referências conceituais

* Martin Fowler:
Fowler, Martin. "Anemic Domain Model." Martin Fowler's Blog, 25 Nov. 2003. Disponível em: https://martinfowler.com/bliki/AnemicDomainModel.html
* Fowler, Martin. "Patterns of Enterprise Application Architecture." Addison-Wesley, 2002. Mais informações: https://martinfowler.com/books/eaa.html
* Eric Evans:
Evans, Eric. "Domain-Driven Design: Tackling Complexity in the Heart of Software." Addison-Wesley, 2004.
Vaughn Vernon:
Vernon, Vaughn. "Implementing Domain-Driven Design." Addison-Wesley, 2013.

Um exemplo simples do uso de regras de negócio ao longo de conceitos do DDD é mostrado abaixo.

## Objeto de Valor (VO - Valor Object)
Definição: Objetos pequenos e imutáveis que representam conceitos do domínio que se diferenciam apenas pelos valores dos seus atributos.

Uso de regras de negócio: Utilizados para validações complexas de formatos ou cálculos que são específicos do domínio.

```cs
public class Email
{
    public string Endereco { get; private set; }

    public Email(string endereco)
    {
        if (!ValidarEmail(endereco))
            throw new EmailInvalidoException("Endereço de e-mail inválido.");
        Endereco = endereco;
    }

    private bool ValidarEmail(string endereco)
    {
        return Regex.IsMatch(endereco, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
    }

    public override bool Equals(object obj)
    {
        return obj is Email other && Endereco == other.Endereco;
    }

    public override int GetHashCode()
    {
        return Endereco.GetHashCode();
    }
}

public class EmailInvalidoException : Exception
{
    public EmailInvalidoException(string message) : base(message)
    {
    }
}

```

---

## Entidades
Definição: Objetos que possuem identidade única, com continuidade e integridade de identidade ao longo do tempo, essenciais para representar elementos de negócio que necessitam ser rastreados.

Uso de regras de negócio: Inclui validações de estado e operações que são fundamentais para manter a consistência do objeto ao longo de sua vida útil.


Exemplo de código C#:

```cs
public class Cliente {
    public Guid Id { get; private set; }
    public string Nome { get; private set; }
    public Email Email { get; private set; }

    public Cliente(string nome, Email email) {
        Id = Guid.NewGuid();
        Nome = nome ?? throw new ArgumentNullException("Nome não pode ser nulo.");
        Email = email ?? throw new ArgumentNullException("Email não pode ser nulo.");
    }

    public void AlterarEmail(Email novoEmail) {
        Email = novoEmail ?? throw new ArgumentNullException("Novo e-mail não pode ser nulo.");
    }
}

    ...
}
```

## Raizes Agregadas
Definição: Entidades que atuam como ponto de controle e entrada para um cluster de objetos associados, gerenciando a lógica entre eles para garantir a consistência das regras de negócio.

Uso de regras de negócio: Responsável por criar, deletar ou modificar entidades dentro do agregado, garantindo que todas as operações respeitem as invariantes do domínio.

```cs
public class Pedido {
    public Guid Id { get; private set; }
    private List<ItemPedido> itens = new List<ItemPedido>();
    public Cliente Cliente { get; private set; }
    public decimal ValorTotal { get; private set; }

    public Pedido(Cliente cliente) {
        Id = Guid.NewGuid();
        Cliente = cliente ?? throw new ArgumentNullException("Cliente é obrigatório.");
    }

    public void AdicionarItem(Produto produto, int quantidade) {
        if (produto == null) throw new ArgumentNullException("Produto não pode ser nulo.");
        if (quantidade <= 0) throw new InvalidOperationException("Quantidade deve ser maior que zero.");
        
        var item = itens.Find(i => i.Produto.Id == produto.Id);
        if (item != null) {
            item.AtualizarQuantidade(item.Quantidade + quantidade);
        } else {
            itens.Add(new ItemPedido(produto, quantidade));
        }
        RecalcularValorTotal();
    }

    private void RecalcularValorTotal() {
        ValorTotal = itens.Sum(i => i.Produto.Preco * i.Quantidade);
    }

    public void RemoverItem(Guid produtoId) {
        var item = itens.Find(i => i.Produto.Id == produtoId);
        if (item == null)
            throw new InvalidOperationException("Item não encontrado no pedido.");
        itens.Remove(item);
        RecalcularValorTotal();
    }
    ...
}
```

## Repositório - Regras de persistência
O repositório é responsável por abstrair toda a lógica de acesso a dados para a entidade Pedido, seguindo o padrão de repositório.

```cs
public interface IPedidoRepositorio {
    Pedido ObterPorId(Guid pedidoId);
    void Salvar(Pedido pedido);
    void Atualizar(Pedido pedido);
    void Remover(Pedido pedido);
}

public class PedidoRepositorio : IPedidoRepositorio {
    private readonly DbContext _context;

    public PedidoRepositorio(DbContext context) {
        _context = context;
    }

    public Pedido ObterPorId(Guid pedidoId) {
        return _context.Pedidos.Include(p => p.Itens)
                               .SingleOrDefault(p => p.Id == pedidoId);
    }

    public void Salvar(Pedido pedido) {
        _context.Pedidos.Add(pedido);
        _context.SaveChanges();
    }

    public void Atualizar(Pedido pedido) {
        _context.Entry(pedido).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public void Remover(Pedido pedido) {
        _context.Pedidos.Remove(pedido);
        _context.SaveChanges();
    }
}
```


## Serviço de Domínio
Definição: Encapsula lógicas de negócio que não se encaixam de forma natural em entidades ou objetos de valor.
Uso de regras de negócio: Utilizado para operações complexas que envolvem vários objetos do domínio, oferecendo uma interface clara para ações de negócio.

Exemplo de código C#:

```cs
public class PedidoServico {
    private readonly IPedidoRepositorio _pedidoRepositorio;

    public PedidoServico(IPedidoRepositorio pedidoRepositorio) {
        _pedidoRepositorio = pedidoRepositorio;
    }

    public Pedido CriarPedido(Cliente cliente) {
        var novoPedido = new Pedido(cliente);
        _pedidoRepositorio.Salvar(novoPedido);
        return novoPedido;
    }

    public Pedido ObterPedido(Guid pedidoId) {
        return _pedidoRepositorio.ObterPorId(pedidoId);
    }

    public void AtualizarPedido(Pedido pedido) {
        _pedidoRepositorio.Atualizar(pedido);
    }

    public void RemoverPedido(Guid pedidoId) {
        var pedido = _pedidoRepositorio.ObterPorId(pedidoId);
        if (pedido == null)
            throw new InvalidOperationException("Pedido não encontrado.");
        _pedidoRepositorio.Remover(pedido);
    }
}
```

## Regras de controladores

Definição: Facilita a comunicação entre a camada de apresentação e o modelo de domínio em arquiteturas MVC.

Uso de regras de negócio: Deve focar em receber dados do usuário, passá-los para os serviços ou raízes de agregados e retornar a resposta adequada.


```cs
public class ClienteController : Controller {
    private readonly ServicoCliente servicoCliente;

    public ClienteController(ServicoCliente servico) {
        servicoCliente = servico;
    }

    [HttpPost]
    public ActionResult AtualizarEmail(Guid clienteId, string novoEmail) {
        try {
            var email = new Email(novoEmail);
            servicoCliente.AtualizarEmailCliente(clienteId, email);
            return RedirectToAction("Success");
        } catch (Exception ex) {
            return View("Error", new ErrorViewModel { Message = ex.Message });
        }
    }
}
```