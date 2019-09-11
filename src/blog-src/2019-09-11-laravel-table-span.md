---
title: How to build a table with a rowspan in Laravel
tags:
    - laravel
categories:
    - quick
---

This could be easy as someone suppouses, but how to insert this kind of operation elegantly without overhead of preparing views' presenter?

```php
<table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">User</th>
            <th scope="col">Range</th>
            <th scope="col">Message</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $product)
            @php ($first = true) @endphp
            @foreach($product->reservations as $reservation)
                <tr>
                @if($first == true)
                    <td rowspan="{{$product->reservations->count()}}"> {{$product->name}} </td>
                    @php ($first = false) @endphp
                @endif
                    <td> {{ $reservation->user->name}} </td>
                    <td> {{ $reservation->range }}</td>
                    <td> {{ $reservation->message }} </td>
                    <td> {{ $reservation->status }} </td>
                    <td> <button class="btn btn-primary">Action</button> </td>
                </tr>
            @endforeach
        @endforeach
    </tbody>
</table>
```

Table is still great for displaying data. Thanks to less known to me blade tag `@php` I could add this piece of logic into my view. Remember not to put too much logic into the view, but you know, we programmers sometimes are lazy.
