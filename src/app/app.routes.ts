import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsGalleryComponent } from './home/components/products-gallery/products-gallery.component';
import { ProductdetailsComponent } from './home/components/productdetails/productdetails.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent,
        children: [
            {path: 'products', component: ProductsGalleryComponent},
            {path: 'product/:id', component: ProductdetailsComponent}
        ]
    },
    {path: '', redirectTo: 'home/products', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
