-- Manually verify advertiser account requested for typelcw@gmail.com.
-- This migration confirms the auth email and records advertiser verification metadata.

do $$
declare
  target_user_id uuid;
begin
  select id
    into target_user_id
    from auth.users
   where lower(email) = lower('typelcw@gmail.com')
   limit 1;

  if target_user_id is null then
    raise notice 'No auth.users row found for typelcw@gmail.com; advertiser verification metadata was not updated.';
    return;
  end if;

  update auth.users
     set email_confirmed_at = coalesce(email_confirmed_at, now()),
         confirmed_at = coalesce(confirmed_at, now()),
         raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
           'role', 'advertiser',
           'advertiser_verified', true,
           'advertiser_verified_at', now(),
           'advertiser_verified_by', 'manual_migration_20260714'
         ),
         updated_at = now()
   where id = target_user_id;

  insert into public.users (id, company_name, role)
  values (target_user_id, 'typelcw@gmail.com', 'user')
  on conflict (id) do update
     set role = 'user';
end $$;
