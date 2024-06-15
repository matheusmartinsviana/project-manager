# project-manager
Project Manager System is an application that assists in project production and proficiency, achieving its objectives.
## Relationships - Project Manager
![Relationships - Project Manager](https://github.com/matheusmartinsviana/project-manager/assets/146596878/7c9b2c21-5261-4f86-8d0b-60af12c7c0c3)
[Relationships - Project Manager.pdf](https://github.com/user-attachments/files/15796260/Relationships.-.Project.Manager.pdf)
## Requirements
Clarifying the project requirements is extremely important to have quality and accuracy in what will be developed. <br>
[Project Manager Requirements.pdf](https://github.com/user-attachments/files/15849351/Project.Manager.Requirements.pdf)
## Entities
*User
    * ID (unique)
    * Name
    * Email
    * Password (hash)
    * Creation Date
* Project
    * ID (unique)
    * Name
    * Description
    * Creation Date
    * User ID (relationship with the User entity)
* Task
    * ID (unique)
    * Title
    * Description
    * Creation date
    * Completion date (optional)
    * Status (pending, in progress, completed)
    * Project ID (relationship with the Project entity)
