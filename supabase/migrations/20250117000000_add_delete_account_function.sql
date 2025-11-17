-- Create a function to delete user account and all related data
-- This can be called from the client using supabase.rpc()

CREATE OR REPLACE FUNCTION delete_user_account()
RETURNS jsonASSERT json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_user_id uuid;
BEGIN
  -- Get the current user's ID
  deleted_user_id := auth.uid();

  -- Check if user is authenticated
  IF deleted_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Delete will cascade to all related tables due to ON DELETE CASCADE
  -- This includes: transactions, profiles, and any other tables with user_id FK
  DELETE FROM auth.users WHERE id = deleted_user_id;

  RETURN json_build_object(
    'success', true,
    'message', 'Account deleted successfully'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'message', SQLERRM
    );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_user_account() TO authenticated;

COMMENT ON FUNCTION delete_user_account() IS 'Allows authenticated users to delete their own account and all related data';
