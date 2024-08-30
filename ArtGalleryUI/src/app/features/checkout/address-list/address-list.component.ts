import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddressList } from '../models/address-list.model';
import { Observable, Subscription } from 'rxjs';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent implements OnInit, OnDestroy{
  userId:any= '';
  model?: AddressList[];
  addresses$?: Observable<AddressList[]>;
  private getAddressesByUserIdSubscription?: Subscription;
  private paramsSubscription?: Subscription;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.userId=params.get('userId');
        if(this.userId){
          this.addressService.getAddressesByUserId(this.userId).subscribe({
            next: (response) => {
              this.model=response;
              //this.addresses$=this.addressService.getAddressesByUserId(this.userId);
            },
          });
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.getAddressesByUserIdSubscription?.unsubscribe();
  }

}
