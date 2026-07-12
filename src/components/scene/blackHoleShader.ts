export const blackHoleVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const blackHoleFragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uScale;
  uniform float uExposure;
  uniform float uIntensity;
  uniform float uQuality;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 offset = fract(point);
    offset = offset * offset * (3.0 - 2.0 * offset);

    return mix(
      mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), offset.x),
      mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + 1.0), offset.x),
      offset.y
    );
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int index = 0; index < 5; index++) {
      value += amplitude * noise(point);
      point = point * 2.03 + 17.1;
      amplitude *= 0.48;
    }

    return value;
  }

  mat2 rotate2d(float angle) {
    float cosine = cos(angle);
    float sine = sin(angle);
    return mat2(cosine, -sine, sine, cosine);
  }

  vec3 starField(vec2 point, float bend, float layer) {
    float density = mix(74.0, 112.0, layer);
    vec2 grid = floor(point * density);
    vec2 cell = fract(point * density) - 0.5;
    float seed = hash21(grid + layer * 19.7);
    float star = 1.0 - smoothstep(0.0, 0.056, length(cell));
    star *= step(0.986 - bend * 0.014, seed);
    float temperature = hash21(grid + 7.3);
    vec3 tint = mix(vec3(0.58, 0.67, 0.82), vec3(1.0, 0.74, 0.47), temperature);
    return tint * star * (0.28 + 1.85 * seed);
  }

  void main() {
    vec2 fragment = vUv * uResolution;
    vec2 uv = (fragment * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

    vec2 pointerOffset = uPointer * vec2(0.18, 0.13);
    uv -= uCenter + pointerOffset;
    uv /= max(uScale, 0.001);

    float radius = length(uv);
    vec2 direction = uv / max(radius, 0.001);
    float pointerEnergy = length(uPointer);
    float bend = (0.17 + pointerEnergy * 0.045) / (radius + 0.085);
    vec2 bentUv = uv + direction * bend * 0.12;
    bentUv += uPointer * vec2(0.078, -0.052);

    vec3 color = vec3(0.0025, 0.0035, 0.0065);
    color += starField(bentUv * 0.72 + vec2(0.0, uTime * 0.0007), bend, 0.0);
    color += starField(bentUv * 1.51 - 4.2, bend, 1.0) * 0.46 * uQuality;

    float diskRotation = -0.1 + uPointer.x * 0.2;
    float diskCompression = 0.19 + uPointer.y * 0.05;
    vec2 diskUv = rotate2d(diskRotation) * uv;
    float diskRadius = length(vec2(diskUv.x, diskUv.y / diskCompression));
    float diskBand = (1.0 - smoothstep(0.94, 1.27, diskRadius)) * smoothstep(0.385, 0.5, diskRadius);
    float diskCore = exp(-abs(diskUv.y) * mix(46.0, 58.0, uQuality)) * diskBand;
    float angle = atan(diskUv.y / diskCompression, diskUv.x);
    float turbulence = fbm(vec2(angle * 3.25 - uTime * 0.105, diskRadius * 12.5));
    turbulence += 0.32 * sin(angle * 31.0 - diskRadius * 39.0 - uTime * 0.72);
    turbulence += 0.14 * sin(angle * 67.0 + diskRadius * 23.0 + uTime * 0.31) * uQuality;
    float strands = smoothstep(0.12, 0.9, turbulence);
    float doppler = smoothstep(-0.96, 0.92, -diskUv.x / max(diskRadius, 0.01));
    float diskLight = diskCore * (0.38 + 2.55 * strands) * mix(0.48, 2.05, doppler);

    vec3 ember = vec3(0.64, 0.095, 0.018);
    vec3 amber = vec3(1.0, 0.39, 0.07);
    vec3 whiteHot = vec3(1.0, 0.86, 0.57);
    vec3 diskColor = mix(ember, amber, strands);
    diskColor = mix(diskColor, whiteHot, pow(doppler, 3.0) * strands);
    color += diskColor * diskLight * uIntensity;

    float lensEllipse = length(vec2(diskUv.x, (diskUv.y - 0.02) / 0.77));
    float upperArc = exp(-abs(lensEllipse - 0.322) * 98.0);
    upperArc *= smoothstep(-0.14, 0.15, diskUv.y);
    upperArc *= 1.0 - smoothstep(0.35, 0.61, abs(diskUv.x));

    float lowerEllipse = length(vec2(diskUv.x, (diskUv.y + 0.018) / 0.81));
    float lowerArc = exp(-abs(lowerEllipse - 0.315) * 112.0);
    lowerArc *= 1.0 - smoothstep(-0.17, 0.12, diskUv.y);
    lowerArc *= 1.0 - smoothstep(0.34, 0.54, abs(diskUv.x));

    float arcFlicker = 0.72 + 0.4 * fbm(vec2(angle * 4.0 + uTime * 0.075, 2.0));
    color += mix(amber, whiteHot, 0.68) * upperArc * arcFlicker * 1.95 * uIntensity;
    color += mix(ember, amber, 0.65) * lowerArc * arcFlicker * 0.72 * uIntensity;

    float primaryRing = exp(-abs(radius - 0.286) * 150.0);
    float secondaryRing = exp(-abs(radius - 0.302) * 235.0) * 0.58;
    float tertiaryRing = exp(-abs(radius - 0.313) * 330.0) * 0.28;
    float photonAura = exp(-abs(radius - 0.306) * 18.0) * 0.72;
    float outerAura = exp(-abs(radius - 0.332) * 9.5) * 0.2;
    float ringEnergy = primaryRing + secondaryRing + tertiaryRing;
    color += mix(amber, whiteHot, 0.82) * ringEnergy * (0.74 + doppler * 0.8) * uIntensity;
    color += amber * photonAura * uIntensity;
    color += mix(ember, amber, 0.62) * outerAura * uIntensity;

    float horizon = 1.0 - smoothstep(0.266, 0.294, radius);
    color *= 1.0 - horizon;
    color += vec3(0.0007, 0.0008, 0.0012) * horizon;

    float vignette = 1.0 - smoothstep(0.42, 1.58, length(uv * vec2(0.78, 0.67)));
    color *= 0.44 + 0.56 * vignette;
    color = 1.0 - exp(-color * uExposure);
    color = pow(color, vec3(0.86));

    gl_FragColor = vec4(color, 1.0);
  }
`;
