# Activity 1: Secure API Design and Implementation
**Activity Title:** Designing and Securing a REST API for a Student Information System  

## Part A: Access Control Design

| Role    | Allowed Actions |
| ------- | --------------- |
| **Admin**   | Create, Read, Update, and Delete all student records and user accounts. Full system access. |
| **Faculty** | Read and Update specific student grades/records assigned to them. Cannot delete records. |
| **Student** | Read only their own student profile and grades. Cannot view other students' records or modify data. |

**Questions:**
1. **What authorization model did you apply?**  
   Role-Based Access Control (RBAC).
   
2. **Why is this model appropriate for the system?**  
   The Student Information System has clearly defined, distinct user groups (Admin, Faculty, Student) with specific responsibilities. RBAC is the most appropriate model because it simplifies access management by assigning permissions to roles rather than individual users, making the system easy to scale and maintain as new students or faculty are added.

---

## Part B: Security Threat Analysis

| Scenario | Threat | Mitigation |
| -------- | ------ | ---------- |
| Login API without rate limiting | Brute-force attacks / Credential stuffing | Implement rate limiting (e.g., max 5 attempts per minute) and temporary account lockouts after multiple failed logins. |
| API returns all user data | Excessive Data Exposure | Use serializers to explicitly define and filter which fields should be returned to the client, ensuring sensitive data is excluded. |
| HTTP used instead of HTTPS | Man-in-the-Middle (MitM) attacks / Interception | Enforce HTTPS/TLS configuration to encrypt all data in transit between the client and the server. |

---

## Part C: Encryption Strategy

**1. Which encryption method will you use for:**
*   **Passwords?** Hashing with Salt (e.g., Argon2 or bcrypt).
*   **Stored grades?** Symmetric Encryption (e.g., AES-256).
*   **API communication?** Transport Layer Security (TLS/SSL).

**2. Justify your choices.**
*   *Passwords* should never be stored in plain text or reversibly encrypted. Argon2 is highly resistant to brute-force and GPU attacks, making it the current standard for secure password hashing.
*   *Stored grades* are sensitive data at rest that need to be read and decrypted by authorized users (like Faculty and Admins). AES-256 provides strong, efficient, and fast symmetric encryption suitable for database storage.
*   *API communication* must be protected from interception over the network. TLS ensures that all data in transit is encrypted, protecting both credentials and sensitive records from Man-in-the-Middle attacks.

---

## Part D: Best Practices Reflection

**Why is security considered a continuous process rather than a one-time implementation?**  
Security is a continuous process because cyber threats are constantly evolving as attackers discover new vulnerabilities and develop more sophisticated methods. A system that is considered secure today may become vulnerable tomorrow if new exploits are found in its dependencies, encryption algorithms, or infrastructure. Additionally, as an application grows and new features are added, the attack surface expands, requiring ongoing risk assessments. Regular patching, continuous monitoring, security audits, and updating access controls are essential to maintain a robust defense against emerging threats over the entire lifecycle of the system.
