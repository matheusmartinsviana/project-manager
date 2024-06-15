# project-manager
Project Manager System is an application that assists in project production and proficiency, achieving its objectives.
## Relationships - Project Manager
![Relationships - Project Manager](https://github.com/matheusmartinsviana/project-manager/assets/146596878/7c9b2c21-5261-4f86-8d0b-60af12c7c0c3)
[Relationships - Project Manager.pdf](https://github.com/user-attachments/files/15796260/Relationships.-.Project.Manager.pdf)
## Requirements
Clarifying the project requirements is extremely important to have quality and accuracy in what will be developed. <br>
[Project Manager Requirements.pdf](https://github.com/user-attachments/files/15849351/Project.Manager.Requirements.pdf)
## Entities
* Usuário
    * ID (único)
    * Nome
    * Email
    * Senha (hash)
    * Data de criação
* Projeto
    * ID (único)
    * Nome
    * Descrição
    * Data de criação
    * ID do Usuário (relacionamento com a entidade Usuário)
* Tarefa
    * ID (único)
    * Título
    * Descrição
    * Data de criação
    * Data de conclusão (opcional)
    * Status (pendente, em andamento, concluída)
    * ID do Projeto (relacionamento com a entidade Projeto)
