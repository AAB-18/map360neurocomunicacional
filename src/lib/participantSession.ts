const KEY = "map360_participant_session";

export interface ParticipantSession {
  participantId: string;
  name: string;
  email: string;
  whatsapp: string;
  profession: string;
  education: string;
}

export function saveParticipantSession(s: ParticipantSession) {
  sessionStorage.setItem(KEY, JSON.stringify(s));
}

export function getParticipantSession(): ParticipantSession | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearParticipantSession() {
  sessionStorage.removeItem(KEY);
}
