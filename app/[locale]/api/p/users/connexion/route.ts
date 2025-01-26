import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Base de données utilisateurs simulée
const users = [
  { id: 1, email: 'user1@example.com', password: 'password123' },
  { id: 2, email: 'user2@example.com', password: 'password456' }
];


// Clé secrète pour signer les JWT const JWT_SECRET = 'your-secret-key';
const SECRET_KEY = 'your-secret-key';

export async function POST(request: Request) {
  console.log("api connexion")
  // const resp =  await request.text()
  // console.log({resp})
  try {
    const { email, password } = await request.json();
    console.log({email,password})

    // Cas 1 : Email ou mot de passe manquant ou invalide
    if (!email || !password) {
      return NextResponse.json({ error: 'Email ou mot de passe manquant ou invalide' }, { status: 400 });
    }

    // Recherche de l'utilisateur dans la base de données
    const user = users.find(user => user.email === email);

    // Cas 2 : Email n'est pas dans la base de données
    if (!user) {
      return NextResponse.json({ error: 'Email ou mot de passe invalide' }, { status: 401 });
    }

    // Cas 3 : Email est dans la base de données mais mot de passe incorrect
    if (user.password !== password) {
      return NextResponse.json({ error: 'Email ou mot de passe invalide' }, { status: 401 });
    }

    // Cas 4 : Email et mot de passe corrects
    const accessToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '5h' });
    const refreshToken = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '7d' });
        // Dans la partie où l'inscription réussit (Cas 3)
        cookies().set('sessionId', accessToken, { // cookies().set('accessToken', accessToken, {
          httpOnly: true,   // Pour empêcher l'accès JavaScript
          secure: true,     // Utiliser uniquement en HTTPS
          sameSite: 'strict', // Protection contre les attaques CSRF
          path:"/",
          maxAge: 60 * 60*5   // Expire dans 5 heure
        });
    

    return NextResponse.json({ accessToken, refreshToken }, { status: 200 });

  } catch (error) {
    console.log("==== errrrrror ======= in server")
    console.debug(error)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}