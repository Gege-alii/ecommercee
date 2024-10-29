import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OneCategoryComponent } from './components/one-category/one-category.component';
import { ShowOneProductComponent } from './components/show-one-product/show-one-product.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AccountComponent } from './components/account/account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,title:'E-Commerce | Home ',pathMatch:'full'},
  {path:'contact',component:ContactComponent,title:'E-Commerce | Contact ',pathMatch:'full'},
  {path:'about',component:AboutComponent,title:'E-Commerce | About ',pathMatch:'full'},
  {path:'signup',component:SignupComponent,title:'E-Commerce | Sign Up ',pathMatch:'full'},
  {path:'login',component:LoginComponent,title:'E-Commerce | Login',pathMatch:'full'},
  {path:'products',component:ProductsComponent,title:'E-Commerce | All Products ',pathMatch:'full'},
  {path:'categories',component:CategoriesComponent,title:'E-Commerce | All Categories ',pathMatch:'full'},
  {path:'categories/:cat',component:OneCategoryComponent,title:'E-Commerce | One Category',pathMatch:'full'},
  {path:'product/:id',component:ShowOneProductComponent,title:'E-Commerce | One Product ',pathMatch:'full'},
  {path:'forgetPassword',component:ForgetPasswordComponent,title:'E-Commerce | Forget Password ',pathMatch:'full'},
  {path:'cart',component:CartComponent,title:'E-Commerce | My Cart ',pathMatch:'full',canActivate:[authGuard]},
  {path:'wishlist',component:WishlistComponent,title:'E-Commerce | My Wishlist ',pathMatch:'full',canActivate:[authGuard]},
  {path:'account',component:AccountComponent,title:'E-Commerce | My Account ',pathMatch:'full',canActivate:[authGuard]},
  {path:'checkout',component:CheckoutComponent,title:'E-Commerce | Checkout ',pathMatch:'full',canActivate:[authGuard]},
  {path:'**',component:NotFoundComponent,title:'E-Commerce | 404 ',pathMatch:'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
