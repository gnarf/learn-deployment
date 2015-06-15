# SSH Basics
SSH is a protocol which facilitates the creation of a secure text-based shell connection between machines. While many developers use it everyday the particulars of what's happening under the hood are often not understood or overlooked.

## Primer: Asymmetric Cryptography
In order for the communication between two machines to be secure it's necessary that they trust one another. The foundation for this trust is asymmetric cryptography, also known as public-key cryptography. Asymmetric cryptography requires two related but different keys: one public, and one private. The public key is, as you might expect, not meant to be kept a secret and anyone intending to securely communicate with you must be in possession of it.


1. Bob generates a public/private keypair and sends his public key to Alice
1. Alice encrypts the message "Let's get dinner" with Bob's public key and sends the ciphertext to Bob
1. Bob uses his private key to decrypt the ciphertext and sees the message "Let's get dinner"


It is essential that the private key is kept secure as it is the only thing that is capable of decrypting messages encrypted with the public key. The private key is also used to generate cryptographic signatures which can be validated by anyone in possession of the corresponding public key. 


1. Alice generates a public/private keypair and sends the public key to Bob
1. Bob encrypts a sensitive file with Alice's public key
1. Because Bob wants Alice to be 100% certain that he is the person who is sending her this file, he uses his private key to generate a cryptographic signature file based on the ciphertext of the sensitive file
1. Bob sends both the encrypted sensitive file and the file representing the cryptographic signature to Alice
1. Alice uses Bob's public key to verify the signature is from Bob and uses her own private key to decrypt the sensitive file because she is confident that Bob was the person who encrypted the file for her because of the signature.

The assumption in asymmetric cryptography is that possession of the private key is proof of identity. 

## How SSH Uses Your Keys

Depending on which version of the SSH protocol is used (v1 or v2) one of the above asymmetric cryptographic scenarios occurs when a user issues an SSH command in order to verify the connection is coming from a known and trusted user. In SSH v1 the server encrypts a message for the user and it's expected that the user's machine is capable of decrypting it and responding with the correct plain text. This is known as a cryptographic challenge. In SSH v2 the user sends a cryptographic signature that the server validates prior to granting access. In both cases, the result is the same: the server assumes that possession of the private key is proof of identity. If you're curious how the server is able to do this, checkout the next section which covers the `authorized_keys` file.

## Generating SSH Keys

The tool most commonly used to generate keys is OpenSSL. [Github's writeup on key generation](https://help.github.com/articles/generating-ssh-keys/) is thorough and covers all major platforms.
