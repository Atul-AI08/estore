import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsGalleryComponent } from './home/components/products-gallery/products-gallery.component';
import { ProductdetailsComponent } from './home/components/productdetails/productdetails.component';
import { CartComponent } from './home/components/cart/cart.component';
import { UserSignupComponent } from './home/components/users/user-signup/user-signup.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent,
        children: [
            {path: 'products', component: ProductsGalleryComponent},
            {path: 'product/:id', component: ProductdetailsComponent},
            {path: 'cart', component: CartComponent},
            {path: 'signup', component: UserSignupComponent},
        ]
    },
    {path: '', redirectTo: 'home/products', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
