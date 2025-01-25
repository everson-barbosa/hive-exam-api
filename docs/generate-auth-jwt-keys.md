
# Generating Public and Private Keys for RS256 JWT

This guide explains how to generate a public and private key pair for RS256 (RSA 256-bit) JWT on Ubuntu, macOS, and Windows.

---

## **Ubuntu and macOS**

Both Ubuntu and macOS typically have OpenSSL pre-installed. If not, you can install it using the following commands:

- **Ubuntu:**

  ```bash
  sudo apt update && sudo apt install openssl
  ```

- **macOS:**

  ```bash
  brew install openssl
  ```

### **Steps**

1. **Generate a Private Key:**

   ```bash
   openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
   ```

2. **Generate a Public Key from the Private Key:**

   ```bash
   openssl rsa -pubout -in private.key -out public.key
   ```

3. **Convert the Keys to Base64:**

   - **Private Key:**

     ```bash
     cat private.key | base64 > private.key.b64
     ```

   - **Public Key:**

     ```bash
     cat public.key | base64 > public.key.b64
     ```

---

## **Windows**

### **Using OpenSSL on Windows**

1. Download OpenSSL for Windows from the [official website](https://slproweb.com/products/Win32OpenSSL.html) or use [Git for Windows](https://gitforwindows.org/) (which includes OpenSSL in its bash terminal).

2. Open a terminal (Command Prompt, PowerShell, or Git Bash).

3. Use the same commands as for Ubuntu/macOS:

   - **Generate a Private Key:**

     ```bash
     openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
     ```

   - **Generate a Public Key from the Private Key:**

     ```bash
     openssl rsa -pubout -in private.key -out public.key
     ```

4. **Convert the Keys to Base64:**

   - **Private Key:**

     ```bash
     type private.key | openssl base64 -out private.key.b64
     ```

   - **Public Key:**

     ```bash
     type public.key | openssl base64 -out public.key.b64
     ```

---

## **Additional Notes**

- **Key Size:** For RS256, a 2048-bit key is recommended. Adjust the `rsa_keygen_bits` value if needed.
- **Permissions (Linux/macOS):** For security, restrict access to the private key:

  ```bash
  chmod 600 private.key
  chmod 644 public.key
  ```
- **Windows Security:** Ensure the private key file is stored in a secure location and accessible only by authorized users.
