use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn find_rotate_steps(ring: String, key: String) -> i32 {
        let nr = ring.len();
        let nk = key.len();

        let cixs = ring.chars().enumerate().fold(
            HashMap::<char, HashSet<usize>>::new(),
            |mut a, (i, x)| {
                a.entry(x).or_insert_with(HashSet::new).insert(i);
                a
            },
        );

        let mut layer: Vec<(usize, i32)> = vec![(0, 0)];
        for c in key.chars() {
            let mut next_layer: Vec<(usize, i32)> = Vec::new();
            if let Some(ixs) = cixs.get(&c) {
                for &ix in ixs.iter() {
                    let mut minlength = i32::MAX;
                    for &(pix, ppath) in layer.iter() {
                        let diff = if ix < pix { pix - ix } else { ix - pix };
                        let dist = diff.min(nr - diff);
                        minlength = minlength.min(ppath + dist as i32);
                    }
                    next_layer.push((ix, minlength));
                }
            }
            layer = next_layer;
        }

        layer.iter().map(|x| x.1).min().unwrap() + nk as i32
    }
}