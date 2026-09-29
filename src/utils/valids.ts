// email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const looksLikeSqlInjection = (value: any): boolean => {
    if (typeof value !== "string") {
        return false;
    }

    const patterns = [
        /(\bor\b|\band\b)\s+['"`]?\w+['"`]?\s*=\s*['"`]?\w+/i,
        /union\s+(all\s+)?select/i,
        /\bselect\b.+\bfrom\b/i,
        /\binsert\b.+\binto\b/i,
        /\bupdate\b.+\bset\b/i,
        /\bdelete\b.+\bfrom\b/i,
        /\bdrop\s+(table|database)/i,
        /(--|#|\/\*)/
    ];

    return patterns.some(pattern => pattern.test(value));
}

export const containsSuspiciousInput = (data: any): boolean => {

    if (typeof data === "string") {
        return looksLikeSqlInjection(data);
    }

    if (Array.isArray(data)) {
        return data.some(item => containsSuspiciousInput(item));
    }

    if (data && typeof data === "object") {
        return Object.values(data)
            .some(value => containsSuspiciousInput(value));
    }

    return false;
}


export const decodeJwtPayload = (token: string) => {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const base64 = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(char =>
          `%${('00' + char.charCodeAt(0).toString(16)).slice(-2)}`
        )
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJwtPayload(token);

  if (!payload) {
    return true;
  }

  if (!payload.exp) {
    return true;
  }

  return Date.now() >= payload.exp * 1000;
}