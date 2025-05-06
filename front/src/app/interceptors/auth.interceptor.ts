import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const isBrowser = typeof window !== 'undefined';

  //  le token sera récupérer uniquement si on est côté client
  const token = isBrowser ? localStorage.getItem('token') : null;
  // Si le token est présent, il ajoute le header d'Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);

};
