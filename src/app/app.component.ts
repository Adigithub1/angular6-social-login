
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import {
    AuthService,
    SocialUser,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  private user: SocialUser;
  public authorized: boolean = false;
  


  constructor( private socialAuthService: AuthService, private httpClient: HttpClient) {}
  
  public socialSignIn(socialPlatform : string) {  

    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData        
        if (userData != null) {
               this.authorized = true;
               this.user = userData;  
                       
                       console.log(this.user);
            this.getGetUserDetails(userData.token);
          
                
            }       
      }
    );
  }
  
  public getGetUserDetails(accessToken){
      this.httpClient.get('https://graph.facebook.com/me?fields= name,gender,location,picture, address, birthday &access_token=EAADkYRFwh4cBAKf31690otmKvuG59EihexuWnp8w1VHEUPgnEB2wPb8OzPLYtnaL6epHLiTxc2E96hvHXiDnAfXc4rBxaZB5dmXULCpX4NSD5eZBYNDllgvRDJ5K2fCZCPgAW5ZBrfLuBJAADgdZCZBYmvwJRYlWv3QtX9IJr7Ivpe08xL48SxofwrWgp38gB7K0SEREZCMqwZDZD').subscribe(result=>{
        console.log(result);
      
      });
  
  
     // let url = 'https://graph.facebook.com/me?fields= "name,gender,location,picture&access_token=${}';
      //this.httpClient.get(url, {observe: 'response'}).then(result=>{});

  }

  public signOut(){
          this.socialAuthService.signOut();
          this.authorized = false;
      }
}
