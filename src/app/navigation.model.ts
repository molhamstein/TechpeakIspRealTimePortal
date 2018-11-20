import { MainService } from "./core/services/main.service";

export class NavigationModel {
    public model: any[];
    role = "";

    constructor(private mainServ : MainService) {
        this.role = mainServ.loginServ.getRole();
        if (this.role == "partner") {
            this.model = [
                {
                    'id': 'home',
                    'title': 'الرئيسية',
                    'type': 'item',
                    'icon': 'home',
                    'url': '/home'
                }
            ]
        }
        else {

            this.model = [
                {
                    'id': 'home',
                    'title': 'المتصلون حالياً',
                    'type': 'item',
                    'icon': 'home',
                    'url': '/home'
                },
                {
                    'id': 'home',
                    'title': 'السجل',
                    'type': 'item',
                    'icon': 'home',
                    'url': '/offline'
                }
    
            ]
            
        }
  
    }
}
