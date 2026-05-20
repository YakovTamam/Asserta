-- ── FAQ items ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_items (
  id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  question    text    NOT NULL,
  answer      text    NOT NULL,
  position    integer DEFAULT 0,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- ── Why-Us items ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS why_us_items (
  id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  icon        text    DEFAULT '✦',
  title       text    NOT NULL,
  body        text    NOT NULL,
  position    integer DEFAULT 0,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- ── Video sections ─────────────────────────────────────────────────────────
-- overlays JSONB shape:
-- [{ id, text, type("h1"|"h2"|"p"|"caption"), pos_x("left"|"center"|"right"),
--    pos_y("top"|"middle"|"bottom"), color, fontSize, fontWeight,
--    anim_in("none"|"fadeIn"|"slideUp"|"slideDown"|"slideLeft"|"slideRight"|"zoom"),
--    scroll_show(0-1), scroll_hide(0-1) }]
--
-- buttons JSONB shape:
-- [{ id, text, href, style("primary"|"outline"),
--    pos_x("left"|"center"|"right"), pos_y("top"|"middle"|"bottom"),
--    scroll_show(0-1), scroll_hide(0-1) }]
CREATE TABLE IF NOT EXISTS video_sections (
  id          uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  position    integer DEFAULT 0,          -- 1 = first video, 2 = second, etc.
  video_url   text,
  poster_url  text,
  overlays    jsonb   DEFAULT '[]',
  buttons     jsonb   DEFAULT '[]',
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Enable RLS (adjust policies to your needs)
ALTER TABLE faq_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_us_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_sections ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public read faq"   ON faq_items     FOR SELECT USING (true);
CREATE POLICY "public read why"   ON why_us_items  FOR SELECT USING (true);
CREATE POLICY "public read video" ON video_sections FOR SELECT USING (true);

-- Service-role write (admin panel uses service role via supabaseAdmin)
CREATE POLICY "admin write faq"   ON faq_items     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write why"   ON why_us_items  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write video" ON video_sections FOR ALL USING (true) WITH CHECK (true);
