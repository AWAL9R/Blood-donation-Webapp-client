export const firebaseErrorMessages = {
  'auth/invalid-email': 'Invalid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'Email already registered.',
  'auth/weak-password': 'Password is too weak.',
  'auth/missing-password': 'Please enter a password.',
  'auth/missing-email': 'Please enter your email.',
  'auth/network-request-failed': 'Network error. Check your connection.',
  'auth/too-many-requests': 'Too many attempts. Try again later.',
  'auth/popup-closed-by-user': 'Login popup closed before completing.',
  'auth/cancelled-popup-request': 'Popup request was cancelled.',
  'auth/popup-blocked': 'Popup blocked by browser.',
  'auth/operation-not-allowed': 'This sign-in method is disabled.',
  'auth/invalid-credential': 'Invalid or expired credentials.',
  'auth/invalid-verification-code': 'Invalid verification code.',
  'auth/invalid-verification-id': 'Invalid verification ID.',
  'auth/missing-verification-code': 'Verification code required.',
  'auth/app-deleted': 'App instance deleted.',
  'auth/internal-error': 'An unexpected error occurred.',
  'auth/invalid-api-key': 'Invalid API key.',
  'auth/quota-exceeded': 'Server quota exceeded. Try later.',
  'auth/requires-recent-login': 'Please reauthenticate to continue.',
  'auth/timeout': 'Request timed out. Try again.',
};

export const getFirebaseErrorMessage = (error) => {
  return firebaseErrorMessages[error?.code] || 'Something went wrong. Please try again.';
}
