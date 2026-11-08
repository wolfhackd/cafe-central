# Requisitos do sistema

## Objetivo

Desenvolver um sistema para uma cafeteria que permita gerenciar usuários e produtos, receber e acompanhar pedidos, registrar pagamentos, organizar entregas ou retiradas, comunicar-se com os clientes e oferecer descontos.

## Perfis de usuário

- **Administrador**: gerencia usuários, produtos, configurações e relatórios.
- **Funcionário**: atende clientes, registra e acompanha pedidos, pagamentos e entregas ou retiradas.
- **Cliente**: consulta o catálogo, realiza pedidos, acompanha seu histórico e recebe notificações.

Os níveis de acesso e as ações permitidas para cada perfil devem ser definidos e aplicados pelo sistema.

## Organização do desenvolvimento

| Etapa | Módulos | Requisitos funcionais |
| --- | --- | --- |
| MVP 1 | Usuários e produtos | RF01–RF16 |
| MVP 2 | Pedidos e pagamentos | RF17–RF30 |
| MVP 3 | Entregas e notificações | RF31–RF38 |
| MVP 4 | Descontos, relatórios e administração | RF39–RF46 |

## Requisitos funcionais

| ID | MVP | Módulo | Prioridade | Requisito | Estado |
| --- | --- | --- | --- | --- | --- |
| RF01 | MVP 1 | Usuários | Alta | O sistema deve permitir que clientes criem uma conta. | Não implementado |
| RF02 | MVP 1 | Usuários | Alta | O sistema deve permitir que um administrador cadastre funcionários. | Não implementado |
| RF03 | MVP 1 | Usuários | Alta | O sistema deve permitir autenticar usuários por e-mail e senha. | Não implementado |
| RF04 | MVP 1 | Usuários | Alta | O sistema deve permitir que o usuário encerre sua sessão. | Não implementado |
| RF05 | MVP 1 | Usuários | Alta | O sistema deve permitir que o usuário consulte e atualize seus dados cadastrais. | Não implementado |
| RF06 | MVP 1 | Usuários | Alta | O sistema deve permitir que o administrador consulte, edite e desative usuários. | Não implementado |
| RF07 | MVP 1 | Usuários | Alta | O sistema deve permitir atribuir níveis de acesso aos usuários. | Não implementado |
| RF08 | MVP 1 | Produtos | Alta | O sistema deve permitir cadastrar produtos com nome, descrição e preço. | Não implementado |
| RF09 | MVP 1 | Produtos | Alta | O sistema deve permitir editar as informações dos produtos. | Não implementado |
| RF10 | MVP 1 | Produtos | Alta | O sistema deve permitir desativar produtos sem apagar o histórico de pedidos relacionado. | Não implementado |
| RF11 | MVP 1 | Produtos | Alta | O sistema deve permitir organizar produtos por categorias, como cafés, bebidas geladas, salgados, doces e sobremesas. | Não implementado |
| RF12 | MVP 1 | Produtos | Alta | O sistema deve permitir consultar e pesquisar o catálogo de produtos. | Não implementado |
| RF13 | MVP 1 | Produtos | Alta | O sistema deve permitir definir e consultar cada produto como disponível ou indisponível. | Não implementado |
| RF14 | MVP 1 | Usuários | Média | O sistema deve permitir que o usuário solicite a recuperação de senha por e-mail. | Não implementado |
| RF15 | MVP 1 | Produtos | Média | O sistema deve permitir cadastrar e editar categorias de produtos. | Não implementado (a considerar) |
| RF16 | MVP 1 | Produtos | Média | O sistema deve permitir adicionar e atualizar imagens dos produtos e exibi-las no catálogo. | Não implementado (a considerar) |
| RF17 | MVP 2 | Pedidos | Alta | O sistema deve permitir criar pedidos para um cliente ou registrar um pedido atendido por um funcionário. | Não implementado |
| RF18 | MVP 2 | Pedidos | Alta | O sistema deve permitir adicionar produtos e quantidades a um pedido. | Não implementado |
| RF19 | MVP 2 | Pedidos | Alta | O sistema deve permitir alterar ou remover itens de um pedido antes da confirmação. | Não implementado |
| RF20 | MVP 2 | Pedidos | Alta | O sistema deve calcular o subtotal dos itens e o valor total do pedido. | Não implementado |
| RF21 | MVP 2 | Pedidos | Alta | O sistema deve impedir a inclusão de produtos indisponíveis. | Não implementado |
| RF22 | MVP 2 | Pedidos | Alta | O sistema deve permitir consultar pedidos e o histórico de pedidos do cliente. | Não implementado |
| RF23 | MVP 2 | Pedidos | Alta | O sistema deve permitir acompanhar e atualizar o status do pedido. | Não implementado |
| RF24 | MVP 2 | Pedidos | Alta | O sistema deve permitir cancelar um pedido conforme as regras de cancelamento. | Não implementado |
| RF25 | MVP 2 | Pedidos | Média | O sistema deve registrar o histórico de alterações do pedido, incluindo alteração, data e usuário responsável. | Não implementado (a avaliar) |
| RF26 | MVP 2 | Pagamentos | Alta | O sistema deve permitir registrar o pagamento associado a um pedido. | Não implementado |
| RF27 | MVP 2 | Pagamentos | Alta | O sistema deve permitir registrar pagamentos por PIX, cartão ou dinheiro. | Não implementado |
| RF28 | MVP 2 | Pagamentos | Alta | O sistema deve permitir consultar o status do pagamento. | Não implementado |
| RF29 | MVP 2 | Pagamentos | Média | O sistema deve permitir consultar os pagamentos associados a um pedido. | Não implementado |
| RF30 | MVP 2 | Pagamentos | Média | O sistema deve permitir registrar e consultar reembolsos associados a pagamentos. | Não implementado (a avaliar) |
| RF31 | MVP 3 | Entregas | Alta | O sistema deve permitir selecionar entrega ou retirada no balcão para cada pedido. | Não implementado |
| RF32 | MVP 3 | Entregas | Alta | Para pedidos com entrega, o sistema deve permitir registrar e consultar o endereço de entrega. | Não implementado |
| RF33 | MVP 3 | Entregas | Média | O sistema deve permitir consultar os endereços cadastrados do cliente para selecionar o endereço de entrega. | Não implementado (a considerar) |
| RF34 | MVP 3 | Entregas | Alta | O sistema deve permitir acompanhar e atualizar o estado da entrega ou da retirada. | Não implementado |
| RF35 | MVP 3 | Notificações | Média | O sistema deve notificar o cliente sobre mudanças relevantes no status do pedido. | Não implementado |
| RF36 | MVP 3 | Notificações | Média | O sistema deve permitir enviar notificações por e-mail. | Não implementado |
| RF37 | MVP 3 | Notificações | Média | O sistema deve permitir enviar notificações por WhatsApp. | Não implementado |
| RF38 | MVP 3 | Notificações | Média | O sistema deve permitir consultar se uma notificação foi enviada ou se ocorreu uma falha no envio. | Não implementado |
| RF39 | MVP 4 | Descontos | Média | O sistema deve permitir cadastrar cupons de desconto. | Não implementado |
| RF40 | MVP 4 | Descontos | Média | O sistema deve permitir configurar promoções para produtos ou categorias. | Não implementado |
| RF41 | MVP 4 | Descontos | Média | O sistema deve validar e aplicar cupons ou promoções elegíveis ao pedido. | Não implementado |
| RF42 | MVP 4 | Descontos | Média | O sistema deve apresentar o desconto aplicado e atualizar o valor total do pedido. | Não implementado |
| RF43 | MVP 4 | Relatórios | Média | O sistema deve permitir consultar o total de vendas em um período. | Não implementado |
| RF44 | MVP 4 | Relatórios | Média | O sistema deve permitir identificar os produtos mais vendidos. | Não implementado |
| RF45 | MVP 4 | Relatórios | Média | O sistema deve permitir consultar pedidos por status. | Não implementado |
| RF46 | MVP 4 | Administração | Média | O sistema deve restringir as funções administrativas a usuários com nível de acesso autorizado. | Não implementado |

## Regras de negócio propostas para revisão

| ID | Regra |
| --- | --- |
| RN01 | Cada produto deve possuir um estado de disponibilidade: disponível ou indisponível. |
| RN02 | Produtos indisponíveis não podem ser adicionados a novos pedidos. |
| RN03 | O pedido deve guardar os produtos, quantidades e preços praticados no momento da confirmação, para preservar o histórico mesmo que o cadastro do produto mude depois. |
| RN04 | O total do pedido deve considerar itens, descontos e, quando aplicável, o custo de entrega. |
| RN05 | O método de atendimento do pedido deve ser entrega ou retirada no balcão. Endereço é obrigatório apenas para entrega. |
| RN06 | As opções de pagamento previstas são PIX, cartão e dinheiro. A confirmação de pagamentos eletrônicos depende da integração escolhida; pagamentos em dinheiro devem poder ser registrados por um funcionário. |
| RN07 | Cupons e promoções só podem ser aplicados quando estiverem ativos e suas condições forem atendidas. |
| RN08 | Um pedido cancelado não deve permanecer contabilizado como venda concluída. |
| RN09 | Alterações de status e notificações devem estar associadas ao pedido correspondente. |
| RN10 | O preço de um produto deve ser maior que zero. |
| RN11 | Um pedido deve possuir pelo menos um item para ser confirmado. |
| RN12 | A quantidade de cada item deve ser maior que zero. |
| RN13 | Um pedido só pode avançar para os estados permitidos em seu fluxo. |
| RN14 | Um cliente só pode consultar os pedidos associados à sua própria conta. |
| RN15 | Um cupom deve respeitar seu limite de utilização, quando houver. |

## Requisitos não funcionais propostos para revisão

Os valores abaixo são critérios iniciais para tornar os requisitos verificáveis e devem ser ajustados conforme o volume esperado, a infraestrutura e as decisões do projeto.

| ID | Categoria | Requisito |
| --- | --- | --- |
| RNF01 | Segurança | Toda comunicação entre cliente e sistema deve utilizar HTTPS em produção. |
| RNF02 | Segurança | Senhas devem ser armazenadas com algoritmo de hash apropriado para senhas; nunca em texto puro. |
| RNF03 | Segurança | O sistema deve validar a autorização no backend em toda operação protegida, conforme o perfil do usuário. |
| RNF04 | Privacidade | Dados pessoais e de pedidos só devem ser acessíveis a usuários autorizados, respeitando a legislação aplicável de proteção de dados. |
| RNF05 | Desempenho | Em condições normais de operação, pelo menos 95% das consultas ao catálogo e dos registros de pedidos devem responder em até 2 segundos, desconsiderando o tempo de serviços externos. |
| RNF06 | Usabilidade | A interface deve ser responsiva e utilizável em celulares e computadores, sem exigir rolagem horizontal nas telas principais. |
| RNF07 | Compatibilidade | A aplicação deve funcionar nas versões estáveis mais recentes dos navegadores Chrome, Edge, Firefox e Safari. |
| RNF08 | Integridade | Operações de pedido e pagamento devem preservar a consistência dos dados; falhas não devem deixar o pedido parcialmente registrado ou com totais divergentes. |
| RNF09 | Confiabilidade | Falhas ou indisponibilidade dos serviços de e-mail, WhatsApp ou pagamento devem ser registradas e não podem apagar nem corromper o pedido. |
| RNF10 | Auditoria | O sistema deve registrar data, usuário e ação para alterações administrativas de usuários, produtos, pedidos e descontos, sem registrar senhas ou dados secretos. |
| RNF11 | Recuperação | Deve haver cópias de segurança periódicas do banco de dados e um procedimento documentado para restauração. A frequência e o prazo máximo de recuperação devem ser definidos antes da produção. |
| RNF12 | Manutenibilidade | O código deve ser organizado por módulos e possuir testes automatizados para as regras de negócio críticas, autenticação, pedidos e cálculo de valores. |
| RNF13 | Acessibilidade | A interface deve permitir navegação por teclado e apresentar rótulos e mensagens de erro compreensíveis nos formulários principais. |

## Pontos para validação

- Definir se clientes podem finalizar pedidos sem criar uma conta.
- Definir os estados permitidos para pedidos, pagamentos, entregas e retiradas.
- Definir se cartão inclui crédito, débito ou ambos, e qual provedor será usado para PIX e cartão.
- Definir quais eventos serão notificados e se o cliente poderá escolher entre e-mail e WhatsApp.
- Definir se o envio por WhatsApp será integrado a um provedor e quais dados de contato serão obrigatórios.
- Definir regras dos cupons e promoções, como validade, limite de uso, valor mínimo, produtos elegíveis e possibilidade de acumular descontos.
- Definir se haverá taxa de entrega e como ela será calculada.
- Definir se um funcionário pode alterar os preços dos produtos.
- Definir quem pode cancelar pedidos.
- Definir se um pedido pode ser alterado depois de confirmado.
- Definir como será tratado um pagamento aprovado quando o pedido for cancelado.
- Definir se clientes poderão realizar pedidos simultaneamente sem gerar inconsistências.
- RNF05 — Desempenho: definir o volume de usuários e requisições usado nos testes.
- RNF11 — Recuperação: definir a frequência dos backups e o prazo máximo para restaurar o sistema.
- RNF13 — Acessibilidade: definir quais critérios de acessibilidade serão utilizados.
- Validar os navegadores suportados.
