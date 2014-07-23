
require "sass"
require "erb"

module SassySVG
  def self.included(base)
    if base.respond_to?(:declare)
      base.declare :svg_read, [:file, :path]
      base.declare :svg_encode, [:svgStr, :encoding]
    end
  end

  # @todo
  # @see https://gist.github.com/chriseppstein/4ab21dbd5a079ae12f09
  # def file_exists(path)
  #   return bool(false) unless options[:filename] # not all sass has a file name (e.g. std input)
  #   current_directory = File.dirname(options[:filename]) rescue nil # a sass filename from an importer may not be processable by File.dirname
  #   return bool(false) unless current_directory && File.exist?(current_directory) # not all sass files are served from the filesystem
  #   full_path = File.expand_path(path.value, current_directory) # a relative path will be expanded against the current_directory of the sass file, symlinks will be followed, absolute paths will be left alone.
  #   return bool(File.exist?(full_path))
  # end


  # Read an external SVG file and import it as string.
  def svg_read(file, path)
    assert_type file, :String, :file
    assert_type path, :String, :path

    file = file.value
    path = path.value

    root = options[:filesystem_importer].new(".").to_s
    real_path = File.expand_path(File.join(root, path, file))

    data = data(real_path)

    unquoted_string(data)
  end


  # Clean and encode an SVG string.
  def svg_encode(svgStr, encoding)
    assert_type svgStr, :String, :svgStr
    assert_type encoding, :String, :encoding

    unless %w[base64 escaped raw].include?(encoding.value)
      raise ArgumentError.new("$encoding must be either base64, escaped or raw")
    end

    svgStr = svgStr.value.strip.gsub(/>\s+</, "><")

    case encoding.value
    when "base64"
      data = [svgStr].flatten.pack("m0")
    when "escaped"
      data = ERB::Util.url_encode(svgStr)
    else
      data = svgStr.gsub(/#/, "%23")
    end

    unquoted_string(data)
  end


private

  def data(path)
    if File.readable?(path)
      File.open(path, "rb") {|io| io.read}
    else
      raise "File not found or cannot be read: #{path}"
    end
  end

end

module Sass::Script::Functions
  include SassySVG
end
