import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Clé secrète pour signer les tokens JWT (à sécuriser dans un environnement de production)
const JWT_SECRET = 'your-secret-key';

// Base des utilisateurs (mockée en dur)
const users = [
  { id: 1, email: 'user1@example.com', password: 'password123' },
  { id: 2, email: 'user2@example.com', password: 'password456' }
];

// Fonction pour valider le format de l'email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour valider le mot de passe (règles basiques)
function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

// Fonction pour générer un token JWT
function generateJWT(userId: number, email: string) {
  const payload = { id: userId, email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' }); // Token valide pour 1 heure
}

// Interface pour une réponse d'erreur
interface ErrorResponse {
  message: string;
}

// Interface pour une réponse de succès lors de l'inscription
interface SuccessResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

// Union type qui regroupe toutes les réponses possibles de la fonction POST
type RegisterResponse = ErrorResponse | SuccessResponse;

export async function POST(request: Request): Promise<NextResponse<RegisterResponse>> {
  console.log("api register")
  try {
    const { email, password } = await request.json();

    // Cas 1 : Email ou mot de passe manquant ou invalide
    if (!email || !password || !isValidEmail(email) || !isValidPassword(password)) {
      return NextResponse.json(
        { message: 'Email ou mot de passe manquant ou invalide.' },
        { status: 400 }
      );
    }

    // Cas 2 : Vérifier si l'email existe déjà
    const userExists = users.find(user => user.email === email);
    console.log("userExists" , userExists)
    if (userExists) {
      return NextResponse.json(
        { message: 'Cet email est déjà utilisé.' },
        { status: 409 }
      );
    }

    // Cas 3 : Inscription réussie - Ajouter un nouvel utilisateur à la base mockée
    const newUser = { id: users.length + 1, email, password }; // Simuler l'ajout de l'utilisateur
    users.push(newUser);

    // Générer les tokens JWT pour l'utilisateur nouvellement créé
    const accessToken = generateJWT(newUser.id, newUser.email);
    const refreshToken = generateJWT(newUser.id, newUser.email); // Peut être différent si une autre logique est ajoutée
    // Dans la partie où l'inscription réussit (Cas 3)
    cookies().set('sessionId', accessToken, { // cookies().set('accessToken', accessToken, {
      httpOnly: true,   // Pour empêcher l'accès JavaScript
      secure: true,     // Utiliser uniquement en HTTPS
      sameSite: 'strict', // Protection contre les attaques CSRF
      path:"/",
      maxAge: 60 * 60*5   // Expire dans 5 heure
    });

    return NextResponse.json(
      {
        message: 'Inscription réussie.',
        accessToken,
        refreshToken
      },
      { status: 201 }
    );
  } catch (error) {
    // Gérer les erreurs inattendues
    return NextResponse.json(
      { message: 'Erreur lors du traitement de la demande.' },
      { status: 500 }
    );
  }
}
