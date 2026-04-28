-- Categories
create table categories (
  id uuid primary key default gen_random_uuid(),
  name_he text not null,
  name_en text not null,
  slug text unique not null,
  image_url text,
  created_at timestamptz default now()
);

-- Products
create table products (
  id uuid primary key default gen_random_uuid(),
  title_he text not null,
  title_en text not null,
  slug text unique not null,
  description_he text,
  description_en text,
  price numeric(10,2) not null,
  old_price numeric(10,2),
  category_id uuid references categories(id),
  images text[] default '{}',
  badge text,
  in_stock boolean default true,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Customers
create table customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- Orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  status text default 'pending' check (status in ('pending','paid','shipped','delivered','cancelled')),
  total_amount numeric(10,2) not null,
  hyp_transaction_id text,
  items jsonb not null,
  shipping_address jsonb,
  notes text,
  created_at timestamptz default now()
);

-- Admin users (Supabase Auth manages auth, this stores roles)
create table admin_users (
  id uuid primary key references auth.users(id),
  email text not null,
  created_at timestamptz default now()
);

-- RLS policies
alter table categories enable row level security;
alter table products enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table admin_users enable row level security;

-- Public can read categories and products
create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);

-- Only service role (server) can write
create policy "service write categories" on categories for all using (auth.role() = 'service_role');
create policy "service write products" on products for all using (auth.role() = 'service_role');
create policy "service all customers" on customers for all using (auth.role() = 'service_role');
create policy "service all orders" on orders for all using (auth.role() = 'service_role');
create policy "service all admins" on admin_users for all using (auth.role() = 'service_role');
