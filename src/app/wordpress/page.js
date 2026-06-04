export const metadata = { title: "WordPress — Interview Prep" };

export default function WordPressPage() {
  return (
    <>
      <h1>WordPress Development</h1>
      <p>WordPress powers 43% of the web. Interviews for WordPress developer roles go beyond themes and plugins — they test your understanding of the architecture, hooks system, the REST API, security hardening, performance optimization, and Gutenberg block development.</p>

      {/* ────────── ARCHITECTURE ────────── */}
      <h2>WordPress Architecture</h2>
      <p>WordPress is a monolithic PHP application built on top of MySQL/MariaDB. Understanding its request lifecycle is fundamental.</p>

      <h3>The Request Lifecycle</h3>
      <ol>
        <li><b>wp-config.php:</b> Loads database credentials, auth salts, and constants like <code>WP_DEBUG</code>.</li>
        <li><b>wp-settings.php:</b> Bootstraps WordPress — loads core files, active plugins, and the active theme.</li>
        <li><b>Plugin Loading:</b> All active plugins are loaded (their main PHP files are <code>require</code>-d). This is when plugin hooks fire.</li>
        <li><b>Theme Loading:</b> The active theme&apos;s <code>functions.php</code> runs (acts like a plugin for the theme).</li>
        <li><b>Query Parsing:</b> WordPress parses the URL using Rewrite Rules, determines the query (post, page, archive, etc.).</li>
        <li><b>Template Loading:</b> The Template Hierarchy determines which template file renders the page.</li>
      </ol>

      <h3>The Template Hierarchy</h3>
      <p>WordPress uses a priority system to decide which template file to use. Interviewers love asking this.</p>
      <pre><code>{`// For a single blog post (post type "post"):
// 1. single-post-{slug}.php   (most specific)
// 2. single-post.php
// 3. single.php
// 4. singular.php
// 5. index.php                (ultimate fallback)

// For a custom post type "product":
// 1. single-product.php
// 2. single.php
// 3. singular.php
// 4. index.php

// For a category archive:
// 1. category-{slug}.php
// 2. category-{id}.php
// 3. category.php
// 4. archive.php
// 5. index.php`}</code></pre>

      {/* ────────── HOOKS ────────── */}
      <h2>The Hook System — WordPress&apos;s Core Pattern</h2>
      <p>This is the <b>most important concept</b> in WordPress development. The entire plugin/theme ecosystem is built on hooks. It&apos;s essentially the Observer pattern.</p>

      <h3>Actions vs Filters</h3>
      <pre><code>{`// ACTIONS — "Do something at this point in execution"
// They don't return anything; they execute side effects.

// Register a callback on the 'init' action hook
add_action('init', 'my_custom_post_types');

function my_custom_post_types() {
    register_post_type('product', [
        'label'  => 'Products',
        'public' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
        'has_archive' => true,
    ]);
}

// Hook into 'wp_enqueue_scripts' to load CSS/JS
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('main-css', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('main-js', get_template_directory_uri() . '/js/app.js',
        ['jquery'], '1.0.0', true); // true = load in footer
});

// Common actions to know:
// init             — WordPress finished loading, before headers
// wp_enqueue_scripts — Enqueue frontend CSS/JS
// admin_menu       — Register admin menu pages
// save_post        — A post was saved (for custom processing)
// rest_api_init    — Register custom REST API endpoints
// wp_head          — Inject into <head>
// wp_footer        — Inject before </body>`}</code></pre>

      <pre><code>{`// FILTERS — "Modify a value and return it"
// They MUST return the modified (or original) value.

// Modify the page title
add_filter('the_title', function($title) {
    if (is_single()) {
        return '📄 ' . $title;
    }
    return $title;
});

// Modify the main query
add_filter('pre_get_posts', function($query) {
    if (!is_admin() && $query->is_main_query() && is_home()) {
        $query->set('posts_per_page', 12);
        $query->set('post_type', ['post', 'product']);
    }
    return $query;
});

// Common filters to know:
// the_content      — Modify post content before display
// the_title        — Modify post title
// excerpt_length   — Change excerpt word count
// upload_mimes     — Allow/disallow file upload types
// body_class       — Add CSS classes to <body>
// wp_nav_menu_items — Modify navigation menu items`}</code></pre>

      <h3>Hook Priority &amp; Execution Order</h3>
      <pre><code>{`// Third parameter is priority (default 10). Lower = runs first.
add_action('init', 'runs_second', 10);
add_action('init', 'runs_first', 5);
add_action('init', 'runs_third', 20);

// Fourth parameter is number of accepted arguments
add_filter('the_content', 'add_author_box', 10, 1);
add_action('save_post', 'sync_to_crm', 10, 3); // receives $post_id, $post, $update`}</code></pre>

      {/* ────────── THE LOOP ────────── */}
      <h2>The Loop &amp; WP_Query</h2>
      <p>The Loop is how WordPress displays content. <code>WP_Query</code> is the class that powers it.</p>
      <pre><code>{`// The standard Loop (in template files)
if (have_posts()) :
    while (have_posts()) : the_post();
        the_title('<h2>', '</h2>');
        the_content();
        the_post_thumbnail('large');
    endwhile;
    the_posts_pagination();
else :
    echo '<p>No posts found.</p>';
endif;

// Custom WP_Query (for custom sections on a page)
$featured = new WP_Query([
    'post_type'      => 'product',
    'posts_per_page' => 6,
    'meta_key'       => 'is_featured',
    'meta_value'     => '1',
    'orderby'        => 'date',
    'order'          => 'DESC',
    'tax_query'      => [
        [
            'taxonomy' => 'product_category',
            'field'    => 'slug',
            'terms'    => 'electronics',
        ],
    ],
]);

if ($featured->have_posts()) :
    while ($featured->have_posts()) : $featured->the_post();
        // Display each product
    endwhile;
    wp_reset_postdata(); // CRITICAL: always reset after custom query
endif;

// get_posts() — simpler alternative for quick queries
$recent = get_posts([
    'post_type'   => 'post',
    'numberposts' => 5,
    'orderby'     => 'date',
]);`}</code></pre>

      {/* ────────── PLUGIN DEVELOPMENT ────────── */}
      <h2>Plugin Development</h2>
      <pre><code>{`<?php
/**
 * Plugin Name: My Custom Plugin
 * Description: A brief description of what it does.
 * Version: 1.0.0
 * Author: Arvind
 * Text Domain: my-custom-plugin
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Activation hook — runs once when plugin is activated
register_activation_hook(__FILE__, function() {
    // Create custom database tables
    global $wpdb;
    $table = $wpdb->prefix . 'custom_logs';
    $charset = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE IF NOT EXISTS $table (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT UNSIGNED NOT NULL,
        action VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user (user_id)
    ) $charset;";
    
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
    
    // Flush rewrite rules if registering custom post types
    flush_rewrite_rules();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});

// Use OOP structure for larger plugins
class MyCustomPlugin {
    private static ?self $instance = null;
    
    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', [$this, 'registerPostTypes']);
        add_action('rest_api_init', [$this, 'registerApiRoutes']);
        add_action('admin_menu', [$this, 'registerAdminPages']);
    }
    
    public function registerPostTypes(): void { /* ... */ }
    public function registerApiRoutes(): void { /* ... */ }
    public function registerAdminPages(): void { /* ... */ }
}

MyCustomPlugin::getInstance();`}</code></pre>

      {/* ────────── REST API ────────── */}
      <h2>WordPress REST API</h2>
      <p>The REST API (since 4.7) makes WordPress a headless CMS. Built-in endpoints at <code>/wp-json/wp/v2/</code>.</p>
      <pre><code>{`// Register a custom REST endpoint
add_action('rest_api_init', function() {
    register_rest_route('myplugin/v1', '/products', [
        'methods'             => 'GET',
        'callback'            => 'get_products',
        'permission_callback' => '__return_true', // Public endpoint
        'args' => [
            'category' => [
                'required'          => false,
                'validate_callback' => fn($param) => is_string($param),
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
    ]);
    
    register_rest_route('myplugin/v1', '/products', [
        'methods'             => 'POST',
        'callback'            => 'create_product',
        'permission_callback' => function() {
            return current_user_can('edit_posts'); // Auth check
        },
    ]);
});

function get_products(WP_REST_Request $request): WP_REST_Response {
    $category = $request->get_param('category');
    
    $query = new WP_Query([
        'post_type' => 'product',
        'posts_per_page' => 20,
    ]);
    
    $products = array_map(function($post) {
        return [
            'id'    => $post->ID,
            'title' => $post->post_title,
            'price' => get_post_meta($post->ID, 'price', true),
        ];
    }, $query->posts);
    
    return new WP_REST_Response($products, 200);
}

// Built-in endpoints you should know:
// GET    /wp-json/wp/v2/posts          — List posts
// GET    /wp-json/wp/v2/posts/{id}     — Single post
// POST   /wp-json/wp/v2/posts          — Create post (auth required)
// PUT    /wp-json/wp/v2/posts/{id}     — Update post
// DELETE /wp-json/wp/v2/posts/{id}     — Delete post
// GET    /wp-json/wp/v2/users/me       — Current user info`}</code></pre>

      {/* ────────── GUTENBERG ────────── */}
      <h2>Gutenberg &amp; Block Development</h2>
      <p>Gutenberg is WordPress&apos;s block-based editor, built with React. Block development is now a key WordPress skill.</p>
      <pre><code>{`// block.json — Block metadata (required since WP 5.8)
{
    "apiVersion": 3,
    "name": "myplugin/hero-banner",
    "title": "Hero Banner",
    "category": "design",
    "icon": "cover-image",
    "description": "A customizable hero banner block.",
    "supports": {
        "html": false,
        "align": ["wide", "full"],
        "color": { "background": true, "text": true }
    },
    "attributes": {
        "heading": { "type": "string", "default": "" },
        "imageUrl": { "type": "string", "default": "" }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css"
}

// Register in PHP
add_action('init', function() {
    register_block_type(__DIR__ . '/blocks/hero-banner');
});

// edit.js (React component for the editor)
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <RichText
                tagName="h1"
                value={attributes.heading}
                onChange={(heading) => setAttributes({ heading })}
                placeholder="Enter heading..."
            />
        </div>
    );
}`}</code></pre>

      {/* ────────── SECURITY ────────── */}
      <h2>Security Hardening</h2>
      <p>WordPress security is a favourite interview topic because of the platform&apos;s massive attack surface.</p>
      <ul>
        <li><b>Data Sanitization:</b> Use <code>sanitize_text_field()</code>, <code>sanitize_email()</code>, <code>wp_kses_post()</code> on all user inputs.</li>
        <li><b>Data Escaping:</b> Use <code>esc_html()</code>, <code>esc_attr()</code>, <code>esc_url()</code>, <code>wp_kses()</code> on all outputs.</li>
        <li><b>Nonce Verification:</b> All form submissions and AJAX calls must include a nonce (<code>wp_nonce_field()</code>, <code>wp_verify_nonce()</code>).</li>
        <li><b>Capability Checks:</b> Always check <code>current_user_can(&apos;manage_options&apos;)</code> before privileged operations.</li>
        <li><b>Database Queries:</b> Use <code>$wpdb-&gt;prepare()</code> for all custom queries. Never interpolate user input.</li>
        <li><b>File Permissions:</b> wp-config.php should be 400/440. Disable file editing in the admin: <code>define(&apos;DISALLOW_FILE_EDIT&apos;, true)</code>.</li>
      </ul>

      {/* ────────── PERFORMANCE ────────── */}
      <h2>Performance Optimization</h2>
      <ul>
        <li><b>Object Caching:</b> Use Redis or Memcached as a persistent object cache (via <code>wp_cache_set/get</code>). Without this, WordPress queries the DB on every page load.</li>
        <li><b>Transients API:</b> Cache expensive queries: <code>set_transient(&apos;key&apos;, $data, HOUR_IN_SECONDS)</code>. Stored in the database (or object cache if available).</li>
        <li><b>Full-Page Caching:</b> Plugins like WP Super Cache or server-level (Nginx FastCGI cache, Varnish) bypass PHP entirely for cached pages.</li>
        <li><b>Autoloaded Options:</b> Options with <code>autoload=yes</code> are loaded into memory on <i>every</i> page load. Audit large autoloaded options (serialized arrays in wp_options).</li>
        <li><b>Reduce Plugins:</b> Each plugin fires hooks and loads files. 50+ plugins = slow site. Audit with Query Monitor plugin.</li>
        <li><b>Image Optimization:</b> Use WebP/AVIF formats, lazy loading (<code>loading=&quot;lazy&quot;</code> is default since WP 5.5), and proper srcset for responsive images.</li>
      </ul>

      {/* ────────── HEADLESS WP ────────── */}
      <h2>Headless WordPress</h2>
      <p>Using WordPress as a backend CMS with a decoupled frontend (Next.js, Nuxt, Gatsby).</p>
      <ul>
        <li><b>Architecture:</b> WordPress serves content via REST API or WPGraphQL plugin. A separate frontend app fetches and renders it.</li>
        <li><b>Pros:</b> Modern frontend stack, better performance (SSG/ISR), improved security (no PHP frontend exposed), flexible multi-platform delivery.</li>
        <li><b>Cons:</b> No live preview (without extra work), no visual editor for non-technical users, plugin frontend features break, increased complexity.</li>
        <li><b>WPGraphQL:</b> A popular plugin that exposes WordPress data via a GraphQL API, more efficient than REST for complex frontends.</li>
      </ul>

      {/* ────────── MULTISITE ────────── */}
      <h2>WordPress Multisite</h2>
      <p>A single WordPress installation managing multiple sites. Common in enterprises and SaaS platforms.</p>
      <ul>
        <li><b>Use Cases:</b> University departments, franchise websites, white-label SaaS products.</li>
        <li><b>Subdomain vs Subdirectory:</b> <code>site1.example.com</code> vs <code>example.com/site1</code>.</li>
        <li><b>Super Admin:</b> Has access to all sites and the Network Admin dashboard.</li>
        <li><b>Shared Resources:</b> Plugins and themes are installed once and activated per-site.</li>
      </ul>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Hooks</td><td>Actions (side effects) vs Filters (modify values). Priority system. add_action/add_filter.</td></tr>
          <tr><td>Template Hierarchy</td><td>Most specific to least specific. single-{"{post_type}"}.php → single.php → index.php.</td></tr>
          <tr><td>Security</td><td>Sanitize inputs, escape outputs, nonces for forms, $wpdb→prepare for queries, capability checks.</td></tr>
          <tr><td>REST API</td><td>register_rest_route, permission_callback, WP_REST_Response. Built-in at /wp-json/wp/v2/.</td></tr>
          <tr><td>Performance</td><td>Object cache (Redis), transients, full-page cache, autoload audit, Query Monitor for profiling.</td></tr>
          <tr><td>Gutenberg</td><td>Block-based editor built with React. block.json, @wordpress/block-editor, Server-side rendering.</td></tr>
        </tbody>
      </table>
    </>
  );
}
