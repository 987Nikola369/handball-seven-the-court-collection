-- Create public storage bucket for CMS images
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true);

-- Allow admins to upload/update/delete files
CREATE POLICY "Admins can manage CMS images"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow anyone to view CMS images
CREATE POLICY "Anyone can view CMS images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'cms-images');
