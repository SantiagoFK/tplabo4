import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router"

function checkAuthStatus(): boolean
{
    const authService = inject(AuthService)
    const router = inject(Router)
    
    if( authService.userIsLoggedIn() )
    {
        return true   
    }
    
    router.navigate(['login'])
    return false
}

export const AuthGuard = () => {
    return checkAuthStatus()
}