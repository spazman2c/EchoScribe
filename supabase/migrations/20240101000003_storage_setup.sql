-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio-files',
  'audio-files',
  false, -- Private bucket
  52428800, -- 50MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/webm', 'audio/ogg']
);

-- Create storage bucket for processed files (transcripts, summaries)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'processed-files',
  'processed-files',
  false, -- Private bucket
  10485760, -- 10MB limit
  ARRAY['application/json', 'text/plain', 'application/pdf']
);

-- Storage policies for audio-files bucket
CREATE POLICY "Users can upload audio files for their meetings" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'audio-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view audio files for their meetings" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'audio-files' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      EXISTS (
        SELECT 1 FROM meetings 
        WHERE meetings.id::text = (storage.foldername(name))[2]
        AND (meetings.created_by = auth.uid() OR auth.uid()::text = ANY(meetings.participants))
      )
    )
  );

CREATE POLICY "Users can update audio files for their meetings" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'audio-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete audio files for their meetings" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'audio-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for processed-files bucket
CREATE POLICY "Users can upload processed files for their meetings" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'processed-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view processed files for their meetings" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'processed-files' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      EXISTS (
        SELECT 1 FROM meetings 
        WHERE meetings.id::text = (storage.foldername(name))[2]
        AND (meetings.created_by = auth.uid() OR auth.uid()::text = ANY(meetings.participants))
      )
    )
  );

CREATE POLICY "Users can update processed files for their meetings" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'processed-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete processed files for their meetings" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'processed-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );