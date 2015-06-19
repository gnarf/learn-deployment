# SSH Basics
SSH is a protocol which facilitates the creation of a secure text-based shell
connection between machines. While many developers use SSH every day, the
particulars of what's happening under the hood are often overlooked.

## Primer: Asymmetric Cryptography
In order for communication between two parties to be secure, it is necessary
that they trust each other. One foundation for building this trust is asymmetric
cryptography, also known as public key cryptography.

Asymmetric cryptography requires two related but different keys: one public,
one private. In its most basic form, secure communication using asymmetric
cryptography looks like this:

```
1. Bob generates a public/private keypair.
2. Bob sends his public key to Alice.
3. Alice encrypts a message with Bob's public key and sends him the resulting
   ciphertext.
4. Bob uses his private key to decrypt the ciphertext, revealing the message.
```

While this method of exchanging messages effectively prevents third parties
from eavesdropping, Bob has no way of knowing who authored the messages he
has received (any number of people may have access to his public key). One
solution for this problem is to use a cryptographic signature.

Before showing how this works, it's important to note that a cryptographic
signature is not meant to be decrypted. It can only be validated (pass/fail).

```
1. Both Bob and Alice generate a public/private keypair.
2. Bob and Alice share public keys with one another.
3. Alice encrypts a message with Bob's public key.
4. Alice wants Bob to be 100% sure that she is the person who sent the message.
   So, she uses her private key to generate a signature based on the ciphertext
   of her message.
5. Alice sends Bob her ciphertext and the corresponding signature.
6. Bob, wanting to verify the author of the message, passes the ciphertext, the
   signature, and his copy of Alice's public key into a cryptographic function.
   This verification function will only return true if all three inputs are
   mathematically linked. If the ciphertext or signature have been tampered with
   in any way, verification will fail.
7. Bob, having verified the ciphertext came from Alice, proceeds as normal by
   decrypting the message using his private key.
```

The assumption in asymmetric cryptography is that possession of the private key
is proof of identity. Keep your private key secure, or anyone can pretend to be
you!

## How SSH Uses Your Keys

In SSHv1, the basic form of public key encryption is used. During connection,
the server encrypts a message for the user and it's expected that the user's machine is capable of decrypting it and responding with the correct plain text. This is known as a cryptographic challenge.

In SSHv2, the user sends a cryptographic signature that the server validates
prior to granting access.

In both cases, the result is the same: the server assumes that possession of
the private key is proof of identity.

If you're curious how the server is able to do this, check out the next section
which covers the `authorized_keys` file.

## Generating SSH Keys

The tool most commonly used to generate keys is OpenSSL. Github's writeup on key generation is thorough and covers all major platforms:

https://help.github.com/articles/generating-ssh-keys/
