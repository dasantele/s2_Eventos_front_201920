import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxRolesService, NgxPermissionsService} from 'ngx-permissions'
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Usuario } from '../usuario/usuario';
import { UsuarioDetail } from '../usuario/usuario-detail';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const API_URL = environment.apiURL;
const usuarios = "/usuarios";

/**
 * The service provider for everything related to authentication
 */
@Injectable()
export class AuthService {

    /**
     * Constructor of the service
     * @param router Angular's Router to redirect the user on login or logout
     * @param roleService NgxRolesService to manage authentication roles
     * @param permissionsService NgxPermissionsService to manage authentication permissions
     */
    constructor (private router: Router, private roleService: NgxRolesService, private permissionsService: NgxPermissionsService, private http: HttpClient) { }

    start (): void {
        this.permissionsService.flushPermissions();
        this.roleService.flushRoles();
        this.permissionsService.loadPermissions(['edit_author_permission', 'delete_author_permission', 'leave_review']);
        const role = localStorage.getItem('role');
        if (!role) {
            this.setGuestRole();
        } else if (role === 'ADMIN') {
            this.setAdministratorRole();
        } else {
            this.setClientRole();
        }
    }

    setGuestRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('GUEST', ['']);
    }

    setClientRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('CLIENT', ['leave_review']);
        localStorage.setItem('role', 'CLIENT');
    }

    setAdministratorRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('ADMIN', ['edit_author_permission', 'delete_author_permission']);
        localStorage.setItem('role', 'ADMIN');
    }

    printRole (): void {
        console.log(this.roleService.getRoles());
    }

    postCliente(user: Usuario): Observable<UsuarioDetail>{
        console.log("entro a esta verga2");
        return this.http.post<UsuarioDetail>(API_URL + usuarios, user);
    }

    getCliente(username: string): Observable<UsuarioDetail>{
        return this.http.get<UsuarioDetail>(API_URL + usuarios + '/' + username);
    }

    /**
     * Logs the user in with the desired role
     * @param role The desired role to set to the user
     */
    login (role): void {
        if (role === 'Administrator') {
            this.setAdministratorRole();
        } else {
            this.setClientRole()
        }
        this.router.navigateByUrl('/');
    }

    /**
     * Logs the user out
     */
    logout (): void {
        this.roleService.flushRoles();
        this.setGuestRole();
        localStorage.removeItem('role');
        this.router.navigateByUrl('/');
    }
}
