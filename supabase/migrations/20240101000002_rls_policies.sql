-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Meetings policies
CREATE POLICY "Users can view meetings they created or are participants in" ON meetings
    FOR SELECT USING (
        auth.uid() = created_by OR 
        auth.uid()::text = ANY(participants)
    );

CREATE POLICY "Users can create meetings" ON meetings
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update meetings they created" ON meetings
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete meetings they created" ON meetings
    FOR DELETE USING (auth.uid() = created_by);

-- Transcriptions policies
CREATE POLICY "Users can view transcriptions for meetings they have access to" ON transcriptions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM meetings 
            WHERE meetings.id = transcriptions.meeting_id 
            AND (meetings.created_by = auth.uid() OR auth.uid()::text = ANY(meetings.participants))
        )
    );

CREATE POLICY "Users can create transcriptions for meetings they have access to" ON transcriptions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM meetings 
            WHERE meetings.id = transcriptions.meeting_id 
            AND (meetings.created_by = auth.uid() OR auth.uid()::text = ANY(meetings.participants))
        )
    );

CREATE POLICY "Users can update transcriptions for meetings they created" ON transcriptions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM meetings 
            WHERE meetings.id = transcriptions.meeting_id 
            AND meetings.created_by = auth.uid()
        )
    );

CREATE POLICY "Users can delete transcriptions for meetings they created" ON transcriptions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM meetings 
            WHERE meetings.id = transcriptions.meeting_id 
            AND meetings.created_by = auth.uid()
        )
    );